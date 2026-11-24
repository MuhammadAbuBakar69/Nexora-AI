"use client";

import React, { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";

/**
 * Password update form reached from the recovery email.
 * The /auth/callback route exchanges the recovery code for a short-lived
 * session first, so updateUser() here always runs against a real session.
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [error, setError] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setHasSession(Boolean(data.user));
      setIsChecking(false);
    });
    return () => {
      active = false;
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setIsDone(true);
    setTimeout(() => {
      window.location.assign("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
          <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src={asset("/logo.png")}
              alt="NEXORA Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heritage text-2xl font-bold tracking-tight text-[#111111]">
            NEXORA
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Set a new password
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-secondary">
          Choose a new password for your Nexora console account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-3xl shadow-float">
          {isChecking ? (
            <p className="text-xs text-secondary text-center py-6">
              Verifying your recovery link…
            </p>
          ) : isDone ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Password updated
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Taking you to your console…
              </p>
            </div>
          ) : !hasSession ? (
            <div className="text-center py-4 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                This link has expired
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Recovery links can only be used once and expire quickly.
              </p>
              <Link href="/forgot-password">
                <Button variant="outline" size="sm" className="mt-2">
                  Request a new link
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-foreground tracking-wide">
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    }
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-foreground tracking-wide">
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmNewPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    leftIcon={<Lock className="w-4 h-4" />}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full text-xs font-semibold h-11 mt-2"
                  isLoading={isLoading}
                >
                  Update Password
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
