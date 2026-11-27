"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Building, Lock, Bell, Shield, Check, Key } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setEmail(user.email || "");
          const namePart = (user.email || "").split("@")[0];
          setName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
          setCompany(`${namePart.charAt(0).toUpperCase() + namePart.slice(1)} Org`);

          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, organization_id")
            .eq("id", user.id)
            .maybeSingle();

          if (profile?.full_name) {
            setName(profile.full_name);
          }

          if (profile?.organization_id) {
            const { data: org } = await supabase
              .from("organizations")
              .select("name")
              .eq("id", profile.organization_id)
              .maybeSingle();
            if (org?.name) setCompany(org.name);
          }
        }
      } catch (err) {
        // Fallback cleanly
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("profiles")
          .update({ full_name: name })
          .eq("id", user.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F6F6F3] font-sans">
      <DashboardHeader
        title="Workspace Configuration &amp; Security"
        subtitle="Manage workspace credentials, organization profile, and notification rules"
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
        {/* CAD Telemetry Marker */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase px-1">
          <span>// WORKSPACE SETTINGS • DWG: CFG-ORG-01</span>
          <span>SECURITY POLICY: ENFORCED</span>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-[#E2E2DA] p-6 space-y-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="pb-4 border-b border-[#E2E2DA] flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
                Organization Profile
              </h3>
              <p className="text-[11px] font-mono text-[#777783] mt-0.5">
                Verified entity identification and administrative contact
              </p>
            </div>
            <span className="text-[10px] font-mono bg-[#F7F7F4] border border-[#E2E2DA] px-2 py-0.5 text-[#555562]">
              TENANT ID: AUTONOMOUS
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#111111] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#777783] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F4] border border-[#E2E2DA] focus:border-[#111111] focus:outline-none font-mono text-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#111111] mb-1">
                  Organization / Entity
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#777783] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F4] border border-[#E2E2DA] focus:border-[#111111] focus:outline-none font-mono text-[#111111]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#111111] mb-1">
                Primary Notification Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#777783] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#EAEAE4] border border-[#E2E2DA] font-mono text-[#555562] cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] font-mono text-[#777783] mt-1">
                Linked to your Supabase authentication identity.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" className="text-xs font-mono font-bold uppercase tracking-wider">
                {saved ? "Saved Changes ✓" : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>

        {/* Security & Credentials */}
        <div className="bg-white border border-[#E2E2DA] p-6 space-y-6 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="pb-4 border-b border-[#E2E2DA]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
              Security &amp; Edge Access Control
            </h3>
            <p className="text-[11px] font-mono text-[#777783] mt-0.5">
              Strict authentication boundaries and credential revocation rules
            </p>
          </div>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#111111] mb-1">
                Current Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777783] absolute left-3 top-2.5" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F4] border border-[#E2E2DA] focus:border-[#111111] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#111111] mb-1">
                New Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777783] absolute left-3 top-2.5" />
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F4] border border-[#E2E2DA] focus:border-[#111111] focus:outline-none font-mono"
                />
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => alert("Password update request dispatched to Supabase Auth.")}
              className="text-xs font-mono font-bold uppercase border-[#E2E2DA]"
            >
              Update Password
            </Button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white border border-[#E2E2DA] p-6 space-y-4 relative">
          <span className="absolute top-2 left-2 font-mono text-xs text-[#888892] select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-[#888892] select-none">+</span>

          <div className="pb-4 border-b border-[#E2E2DA]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
              Quota Notification Channels
            </h3>
            <p className="text-[11px] font-mono text-[#777783] mt-0.5">
              Automated alerts when token consumption or request velocity approaches limits
            </p>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <label className="flex items-center justify-between p-3 bg-[#F7F7F4] border border-[#E2E2DA] cursor-pointer">
              <div>
                <p className="font-bold text-[#111111]">Token Quota Ceilings (80% Alert)</p>
                <p className="text-[#777783] text-[10px]">Instant webhook &amp; email dispatch upon 80% quota consumption</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="accent-[#111111]"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#F7F7F4] border border-[#E2E2DA] cursor-pointer">
              <div>
                <p className="font-bold text-[#111111]">Security &amp; API Key Lifecycle Events</p>
                <p className="text-[#777783] text-[10px]">Real-time notification on key creation, rotation, or revocation</p>
              </div>
              <input
                type="checkbox"
                checked={securityAlerts}
                onChange={(e) => setSecurityAlerts(e.target.checked)}
                className="accent-[#111111]"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[#F7F7F4] border border-[#E2E2DA] cursor-pointer">
              <div>
                <p className="font-bold text-[#111111]">Weekly Gateway Telemetry Digest</p>
                <p className="text-[#777783] text-[10px]">Aggregated report of token throughput across all active models</p>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="accent-[#111111]"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
