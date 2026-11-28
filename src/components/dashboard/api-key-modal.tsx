"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, AlertTriangle, Key } from "lucide-react";
import { ApiKey } from "@/types";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyCreated: (newKey: ApiKey) => void;
}

export function ApiKeyModal({ isOpen, onClose, onKeyCreated }: ApiKeyModalProps) {
  const [step, setStep] = useState<"configure" | "reveal">("configure");
  const [name, setName] = useState("");
  const [rateLimit, setRateLimit] = useState("1000");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "read",
    "models:chat",
    "models:embeddings",
  ]);
  const [generatedSecret, setGeneratedSecret] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasConfirmedSaved, setHasConfirmedSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          rateLimitRpm: parseInt(rateLimit, 10) || 1000,
          permissions: selectedPermissions,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.key) {
        setError(payload.error || "Failed to generate API key.");
        return;
      }

      setGeneratedSecret(payload.key.fullSecret);
      setStep("reveal");
      onKeyCreated(payload.key);
    } catch {
      setError("Network error while creating API key.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFinish = () => {
    setStep("configure");
    setName("");
    setGeneratedSecret("");
    setHasConfirmedSaved(false);
    setError("");
    onClose();
  };

  const togglePermission = (perm: string) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== perm));
    } else {
      setSelectedPermissions([...selectedPermissions, perm]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleFinish}
      title={step === "configure" ? "Generate Edge API Credential" : "Store Edge Secret Key"}
      description={
        step === "configure"
          ? "Configure a customer-scoped credential with granular permissions and rate limits."
          : "Please copy your API key now. For your security, this key will never be shown again."
      }
    >
      {step === "configure" ? (
        <form onSubmit={handleGenerate} className="space-y-4 font-mono">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <Input
            id="keyName"
            label="Credential Identifier Name"
            placeholder="e.g. Production Ingress Microservice"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#777783]">
              // Rate Limit Ceiling (RPM)
            </label>
            <select
              value={rateLimit}
              onChange={(e) => setRateLimit(e.target.value)}
              className="w-full bg-white border border-[#E2E2DA] px-3 py-2 text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111111]"
            >
              <option value="300">300 Requests / min (Testing)</option>
              <option value="600">600 Requests / min (Standard)</option>
              <option value="1000">1,000 Requests / min (Production)</option>
              <option value="1500">1,500 Requests / min (High throughput)</option>
              <option value="3000">3,000 Requests / min (Enterprise)</option>
            </select>
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#777783]">
              // Authorized Scopes &amp; Endpoints
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: "read", label: "Read telemetry" },
                { id: "models:chat", label: "Chat completions" },
                { id: "models:embeddings", label: "Vector embeddings" },
                { id: "models:video", label: "Veo video generation" },
              ].map((scope) => (
                <label
                  key={scope.id}
                  className="flex items-center gap-2 p-2 border border-[#E2E2DA] bg-[#F6F6F3] cursor-pointer select-none hover:bg-white text-[11px]"
                >
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(scope.id)}
                    onChange={() => togglePermission(scope.id)}
                    className="accent-[#111111]"
                  />
                  <span className="font-bold text-[#111111]">{scope.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E2E2DA] mt-4">
            <Button type="button" variant="outline" size="sm" onClick={handleFinish}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isSubmitting} className="gap-1.5 font-bold uppercase tracking-wider">
              <Key className="w-3.5 h-3.5" />
              Generate API Secret
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 font-mono">
          <div className="p-3 bg-amber-50 border border-amber-300 flex items-start gap-3 text-amber-900 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wide block">STORE IN HARDENED VAULT</span>
              You will not be able to view this secret again. If lost, you will need to revoke this key and provision a new one.
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#777783]">
              // Generated API Secret Key
            </label>
            <div className="flex items-center gap-2">
              <div className="p-2.5 bg-[#F6F6F3] border border-[#E2E2DA] text-xs font-mono font-bold text-[#111111] flex-1 overflow-x-auto select-all">
                {generatedSecret}
              </div>
              <Button
                type="button"
                variant={copied ? "secondary" : "primary"}
                size="sm"
                onClick={handleCopy}
                className="shrink-0 h-9 px-3 text-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="ml-1">{copied ? "COPIED" : "COPY"}</span>
              </Button>
            </div>
          </div>

          <label className="flex items-center gap-2 pt-2 text-xs text-[#777783] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasConfirmedSaved}
              onChange={(e) => setHasConfirmedSaved(e.target.checked)}
              className="accent-[#111111]"
            />
            <span className="font-bold text-[#111111]">I have securely copied and saved this secret key in an environment vault.</span>
          </label>

          <div className="flex items-center justify-end pt-4 border-t border-[#E2E2DA]">
            <Button
              type="button"
              disabled={!hasConfirmedSaved}
              size="sm"
              onClick={handleFinish}
              className="text-xs font-bold uppercase tracking-wider"
            >
              Done &amp; Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
