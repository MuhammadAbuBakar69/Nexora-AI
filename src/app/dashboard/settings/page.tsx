"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Building, Lock, Bell, Shield, Check } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("Elena Rostova");
  const [email, setEmail] = useState("elena@aetherdyn.io");
  const [company, setCompany] = useState("Aether Dynamics Inc.");
  const [saved, setSaved] = useState(false);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Account & Security Settings"
        subtitle="Manage workspace credentials, organization profile, and notification rules"
        
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="pb-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">
              Organization Profile
            </h3>
            <p className="text-xs text-secondary">
              Personal details and legal entity identification
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="name"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              <Input
                id="company"
                label="Organization / Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                leftIcon={<Building className="w-4 h-4" />}
                required
              />
            </div>

            <Input
              id="email"
              label="Primary Notification Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm" className="text-xs">
                {saved ? "Saved Changes ✓" : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>

        {/* Security / Password */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="pb-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">
              Security & Credentials
            </h3>
            <p className="text-xs text-secondary">
              Update password and session revocation preferences
            </p>
          </div>

          <div className="space-y-4 max-w-md">
            <Input
              id="currentPassword"
              label="Current Password"
              type="password"
              placeholder="••••••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
            />
            <Input
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Minimum 8 characters"
              leftIcon={<Lock className="w-4 h-4" />}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert("Password updated successfully.")}
              className="text-xs"
            >
              Update Password
            </Button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="pb-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">
              Notification Preferences
            </h3>
            <p className="text-xs text-secondary">
              Configure communication channels for token limits and security notices
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border cursor-pointer select-none">
              <div>
                <p className="font-semibold text-foreground">Token Quota Ceilings & Alerts</p>
                <p className="text-secondary text-[11px]">Receive emails when usage approaches 80%</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-violet-primary focus:ring-violet-primary/20"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border cursor-pointer select-none">
              <div>
                <p className="font-semibold text-foreground">Security & API Key Audit Notifications</p>
                <p className="text-secondary text-[11px]">Alert on key generation, rotation, or revocation</p>
              </div>
              <input
                type="checkbox"
                checked={securityAlerts}
                onChange={(e) => setSecurityAlerts(e.target.checked)}
                className="rounded text-violet-primary focus:ring-violet-primary/20"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border cursor-pointer select-none">
              <div>
                <p className="font-semibold text-foreground">Weekly Consumption Digest</p>
                <p className="text-secondary text-[11px]">Summary report of tokens consumed across active models</p>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="rounded text-violet-primary focus:ring-violet-primary/20"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
