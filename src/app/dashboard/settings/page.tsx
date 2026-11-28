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
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

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
            setOrganizationId(profile.organization_id);
            const { data: org } = await supabase
              .from("organizations")
              .select("name")
              .eq("id", profile.organization_id)
              .maybeSingle();
            if (org?.name) setCompany(org.name);
          }
        }
      } catch {
        setProfileError("Unable to load profile details from Supabase.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setSaved(false);
    setIsSavingProfile(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProfileError("Your session has expired. Please sign in again.");
        return;
      }

      const { error: profErr } = await supabase
        .from("profiles")
        .update({ full_name: name.trim() })
        .eq("id", user.id);

      if (profErr) {
        setProfileError(profErr.message);
        return;
      }

      if (organizationId && company.trim()) {
        const { error: orgErr } = await supabase
          .from("organizations")
          .update({ name: company.trim() })
          .eq("id", organizationId);

        if (orgErr) {
          setProfileError(orgErr.message);
          return;
        }
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setProfileError("Unexpected error while saving profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Please fill in your current and new password.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const supabase = createClient();

      // Re-authenticate with current password before changing credentials.
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });

      if (verifyError) {
        setPasswordError("Current password is incorrect.");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setPasswordError(updateError.message);
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordSuccess("Password updated successfully.");
      setTimeout(() => setPasswordSuccess(""), 4000);
    } catch {
      setPasswordError("Unable to update password right now.");
    } finally {
      setIsUpdatingPassword(false);
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

            {profileError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-xs font-mono text-rose-700">
                {profileError}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" isLoading={isSavingProfile} className="text-xs font-mono font-bold uppercase tracking-wider">
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

          <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
            {passwordError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-xs font-mono text-rose-700">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700">
                {passwordSuccess}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#111111] mb-1">
                Current Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777783] absolute left-3 top-2.5" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F4] border border-[#E2E2DA] focus:border-[#111111] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#111111] mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777783] absolute left-3 top-2.5" />
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F4] border border-[#E2E2DA] focus:border-[#111111] focus:outline-none font-mono"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="sm"
              variant="outline"
              isLoading={isUpdatingPassword}
              className="text-xs font-mono font-bold uppercase border-[#E2E2DA]"
            >
              Update Password
            </Button>
          </form>
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
