"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Route based on email for testing
      if (email.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 800);
  };

  const handleDemoCustomerLogin = () => {
    setEmail("developer@aetherdyn.io");
    setPassword("••••••••••••");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 500);
  };

  const handleDemoAdminLogin = () => {
    setEmail("admin@nexora.cloud");
    setPassword("••••••••••••");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-hero-glow blur-3xl pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
          <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="NEXORA Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heritage text-2xl font-bold tracking-tight text-[#111111]">
            NEXORA
          </span>
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border text-violet-primary focus:ring-violet-primary/20"
                />
                Remember me for 30 days
              </label>
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

          {/* Quick Demo Fillers for Testing */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-[11px] uppercase font-semibold tracking-wider text-secondary text-center mb-3">
              One-Click Evaluation Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoCustomerLogin}
                className="p-2.5 rounded-xl border border-border bg-surface hover:bg-violet-light/30 hover:border-violet-soft/50 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-foreground group-hover:text-violet-primary">
                  Customer Role
                </div>
                <div className="text-[10px] text-secondary">Token & API Portal</div>
              </button>
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                className="p-2.5 rounded-xl border border-border bg-surface hover:bg-violet-light/30 hover:border-violet-soft/50 text-left transition-all group"
              >
                <div className="text-xs font-semibold text-foreground group-hover:text-violet-primary">
                  Admin Role
                </div>
                <div className="text-[10px] text-secondary">Multi-tenant Control</div>
              </button>
            </div>
          </div>

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
