"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "signing-in" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("signing-in");
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setError(
        error.message === "Invalid login credentials"
          ? "That email and password combination doesn't match an account."
          : error.message
      );
      return;
    }

    // Let the server components pick up the new session before navigating.
    router.refresh();
    router.replace("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand px-6">
      <div className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-8">
        <h1 className="font-display text-2xl">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate">
          Sign in with your email and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {status === "error" && <p className="text-sm text-brand">{error}</p>}

          <button
            type="submit"
            disabled={status === "signing-in"}
            className={cn(
              buttonVariants(),
              "w-full rounded-full bg-brand hover:bg-brand/90 text-white h-11"
            )}
          >
            {status === "signing-in" ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
