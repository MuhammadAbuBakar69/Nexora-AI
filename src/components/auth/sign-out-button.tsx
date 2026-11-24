"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

/**
 * Terminates the Supabase session (revokes the refresh token and clears the
 * auth cookies) before navigating away. The previous markup was a plain link to
 * /login, which left the session intact so the middleware bounced the user
 * straight back into the console.
 */
export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    if (isPending) return;
    setIsPending(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("sign out failed:", error.message);
      setIsPending(false);
      return;
    }

    window.location.assign("/login");
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="hover:text-rose-600 transition-colors disabled:opacity-50"
      title="Sign out"
      aria-label="Sign out"
    >
      <LogOut className="w-3.5 h-3.5" />
    </button>
  );
}
