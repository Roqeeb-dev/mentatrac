"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLogin } from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-1.5">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Welcome back
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Good to see you again
        </h1>
        <p className="text-body-sm text-text-secondary">
          Sign in to continue your wellness journey.
        </p>
      </div>

      {/* 2. Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {loginMutation.isError && (
          <div className="rounded-xl bg-error-light p-3 text-caption font-medium text-error">
            {loginMutation.error instanceof Error
              ? loginMutation.error.message
              : "Invalid email or password"}
          </div>
        )}

        <Input
          label="Email address"
          type="email"
          placeholder="alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-caption font-semibold text-text-link transition-colors hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loginMutation.isPending}
            disabled={!email || !password || loginMutation.isPending}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Sign in
          </Button>
        </div>
      </form>

      {/* 3. Social Auth Dividers & Buttons */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <span className="relative bg-canvas px-3 text-caption text-text-tertiary">
          or
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-3 text-body-sm font-semibold text-text-primary shadow-xs transition-colors hover:border-gray-300 hover:bg-surface-2/30"
        >
          <span className="text-base">🍎</span>
          <span>Continue with Apple</span>
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-3 text-body-sm font-semibold text-text-primary shadow-xs transition-colors hover:border-gray-300 hover:bg-surface-2/30"
        >
          <span className="text-base">🔵</span>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
