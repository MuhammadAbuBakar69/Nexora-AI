"use client";

import React, { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  // Surface failures handed back by /auth/callback (expired or reused links).
  useEffect(() => {
    const authError = new URLSearchParams(window.location.search).get(
      "auth_error"
    );
    if (authError) setError(decodeURIComponent(authError));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setIsLoading(false);
      setError(
        signInError.message === "Invalid login credentials"
          ? "Incorrect email or password."
          : signInError.message
      );
      return;
    }

    if (!data.user) {
      setIsLoading(false);
      setError("Sign in failed. Please try again.");
      return;
    }

    // Authorization is read from user_roles in Postgres. The email address is
    // never inspected to decide whether someone is an admin.
    const { data: adminRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();

    const requested = new URLSearchParams(window.location.search).get("next");
    const destination =
      requested && requested.startsWith("/") && !requested.startsWith("//")
        ? requested
        : adminRole
          ? "/admin"
          : "/dashboard";

    // Full navigation, not a client-side push: the freshly written auth
    // cookies must reach the server so middleware and server components see
    // the new session on the very next request.
    window.location.assign(destination);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center justify-center mb-6 group">
          <img
            src={asset("/logo-full.png")}
            alt="nexora AI"
            className="h-10 w-auto object-contain"
          />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Sign in to your console
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-secondary">
          Manage your API credentials, token limits, and cloud resources.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-3xl shadow-float">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Work Email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-foreground tracking-wide">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-violet-primary hover:text-violet-dark transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-secondary">
              <span>Sessions are protected by encrypted HTTP-only cookies.</span>
            </div>

            <Button
              type="submit"
              className="w-full text-xs font-semibold h-11 mt-2"
              isLoading={isLoading}
            >
              Sign In to Console
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-secondary">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="text-violet-primary font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
