"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSignUp } from "@/features/auth/hooks/useAuth";

export default function CreateAccountPage() {
  const router = useRouter();
  const { mutate: signUp, isPending, error: authError } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    signUp(
      { email, password },
      {
        onSuccess: () => {
          router.push("/onboarding/profile");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Create Account
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Create your account
        </h1>
      </div>

      {/* 2. Form Inputs */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Min. 6 characters"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          required
        />

        {/* Auth service error response */}
        {authError && (
          <p className="text-caption font-medium text-error">
            {authError.message || "Failed to create account. Please try again."}
          </p>
        )}

        {/* 3. Security Callout Banner */}
        <div className="flex items-center gap-2.5 rounded-xl bg-[#EAF5EF] px-3.5 py-3 text-[#2D6A4F]">
          <Lock className="h-4 w-4 shrink-0 stroke-[2] text-[#52B788]" />
          <p className="text-caption font-medium leading-snug">
            Your account is secured and your data encrypted. We will never send
            you spam.
          </p>
        </div>

        {/* 4. Actions & Terms */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isPending}
            disabled={isPending || !email || !password}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Create account
          </Button>

          <p className="text-center text-caption text-text-tertiary">
            By continuing you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-purple-600 underline hover:text-purple-700 dark:text-purple-400"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-purple-600 underline hover:text-purple-700 dark:text-purple-400"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
