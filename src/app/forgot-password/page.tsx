"use client";

import React, { useState } from "react";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    setIsLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        // The recovery link lands on /auth/callback, which exchanges the code
        // for a session and then forwards to the password update form.
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      }
    );

    setIsLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    // Always report success: revealing whether an address is registered would
    // let anyone enumerate customer accounts.
    setIsSubmitted(true);
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
          Reset password
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-secondary">
          Enter your registered work email to receive password reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-3xl shadow-float">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Check your inbox</h3>
              <p className="text-xs text-secondary leading-relaxed">
                We sent password recovery instructions to <span className="font-semibold text-foreground">{email}</span>. Please check your spam folder if it doesn&apos;t arrive in 2 minutes.
              </p>
              <div className="pt-4">
                <Link href="/login">
                  <Button variant="outline" className="w-full text-xs">
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="resetEmail"
                type="email"
                label="Account Email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Button
                type="submit"
                className="w-full text-xs font-semibold h-11 mt-2"
                isLoading={isLoading}
              >
                Send Reset Instructions
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <div className="text-center pt-3">
                <Link
                  href="/login"
                  className="text-xs text-secondary hover:text-foreground inline-flex items-center gap-1 font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return to sign in
                </Link>
              </div>
            </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
