import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient, hasSupabaseSecretKey } from "@/lib/supabase/admin";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    if (!hasSupabaseSecretKey()) {
      return NextResponse.json(
        {
          error: {
            message:
              "Gateway server secret is not configured. Add SUPABASE_SECRET_KEY in .env.local.",
            type: "configuration_error",
          },
        },
        { status: 503 }
      );
    }

    const authHeader = request.headers.get("authorization") || "";
    const rawKey = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : "";

    if (!rawKey) {
      return NextResponse.json(
        { error: { message: "Missing Bearer API key.", type: "invalid_request_error" } },
        { status: 401 }
      );
    }

    const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
    const admin = createAdminClient();

    const { data: apiKey, error: keyError } = await admin
      .from("api_keys")
      .select("id, organization_id, status, permissions, rate_limit_rpm")
      .eq("key_hash", keyHash)
      .maybeSingle();

    if (keyError || !apiKey || apiKey.status !== "active") {
      return NextResponse.json(
        { error: { message: "Invalid or revoked API key.", type: "authentication_error" } },
        { status: 401 }
      );
    }

    const perms: string[] = Array.isArray(apiKey.permissions) ? apiKey.permissions : [];
    if (
      perms.length > 0 &&
      !perms.includes("models:chat") &&
      !perms.includes("write") &&
      !perms.includes("admin")
    ) {
      return NextResponse.json(
        { error: { message: "API key lacks models:chat scope.", type: "permission_error" } },
        { status: 403 }
      );
    }

    // Check active quota balance (zero-overdraft enforcement when quota is configured).
    const [{ data: quotas }, { data: usage }] = await Promise.all([
      admin
        .from("quota_allocations")
        .select("tokens_allocated")
        .eq("organization_id", apiKey.organization_id),
      admin
        .from("usage_records")
        .select("input_tokens, output_tokens")
        .eq("organization_id", apiKey.organization_id),
    ]);

    const allocated = (quotas || []).reduce(
      (sum, q) => sum + Number(q.tokens_allocated || 0),
      0
    );
    const consumed = (usage || []).reduce(
      (sum, u) => sum + Number(u.input_tokens || 0) + Number(u.output_tokens || 0),
      0
    );

    if (allocated <= 0 || consumed >= allocated) {
      return NextResponse.json(
        {
          error: {
            message:
              allocated <= 0
                ? "No active token quota allocated for this workspace."
                : "Monthly token quota exhausted (zero-overdraft policy).",
            type: "rate_limit_error",
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const rawModel = typeof body?.model === "string" ? body.model.trim() : "gemini-2.5-flash";
    const model = rawModel.replace(/^(google|openai|anthropic)\//, "");
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: { message: "messages array is required.", type: "invalid_request_error" } },
        { status: 400 }
      );
    }

    let upstreamResponse: Record<string, unknown>;
    let inputTokens = 0;
    let outputTokens = 0;

    if (model.startsWith("gemini")) {
      const geminiKey = process.env.GEMINI_API_KEY?.trim();
      if (!geminiKey) {
        return NextResponse.json(
          { error: { message: "GEMINI_API_KEY is not configured in .env.local.", type: "configuration_error" } },
          { status: 503 }
        );
      }

      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${geminiKey}`,
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: body?.temperature,
            max_tokens: body?.max_tokens,
          }),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(data, { status: res.status });
      }
      upstreamResponse = data;
      inputTokens = Number(data?.usage?.prompt_tokens || 0);
      outputTokens = Number(data?.usage?.completion_tokens || 0);
    } else if (model.startsWith("claude")) {
      const anthropicKey = process.env.ANTHROPIC_API_KEY?.trim();
      if (!anthropicKey) {
        return NextResponse.json(
          { error: { message: "ANTHROPIC_API_KEY is not configured in .env.local.", type: "configuration_error" } },
          { status: 503 }
        );
      }

      const systemMsg = messages.find((m) => m.role === "system")?.content;
      const nonSystem = messages.filter((m) => m.role !== "system");

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: body?.max_tokens ?? 1024,
          system: systemMsg,
          messages: nonSystem,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(data, { status: res.status });
      }

      inputTokens = Number(data?.usage?.input_tokens || 0);
      outputTokens = Number(data?.usage?.output_tokens || 0);
      const text =
        Array.isArray(data?.content) && data.content[0]?.text
          ? data.content[0].text
          : "";

      upstreamResponse = {
        id: data?.id || `chatcmpl-${crypto.randomUUID()}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: text },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: inputTokens,
          completion_tokens: outputTokens,
          total_tokens: inputTokens + outputTokens,
        },
      };
    } else {
      const openaiKey = process.env.OPENAI_API_KEY?.trim();
      if (!openaiKey) {
        return NextResponse.json(
          { error: { message: "OPENAI_API_KEY is not configured in .env.local.", type: "configuration_error" } },
          { status: 503 }
        );
      }

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: body?.temperature,
          max_tokens: body?.max_tokens,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(data, { status: res.status });
      }
      upstreamResponse = data;
      inputTokens = Number(data?.usage?.prompt_tokens || 0);
      outputTokens = Number(data?.usage?.completion_tokens || 0);
    }

    const latencyMs = Date.now() - startedAt;

    await Promise.all([
      admin.from("usage_records").insert({
        organization_id: apiKey.organization_id,
        api_key_id: apiKey.id,
        request_id: `req_${crypto.randomUUID()}`,
        status_code: 200,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        latency_ms: latencyMs,
      }),
      admin
        .from("api_keys")
        .update({ last_used_at: new Date().toISOString() })
        .eq("id", apiKey.id),
    ]);

    return NextResponse.json(upstreamResponse);
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          message: err instanceof Error ? err.message : "Gateway routing failure.",
          type: "server_error",
        },
      },
      { status: 500 }
    );
  }
}
