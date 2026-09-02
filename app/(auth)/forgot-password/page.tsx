"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      // Call your password reset request API endpoint here
      // await authService.requestPasswordReset({ email });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Forgot Password
        </h1>
        <p className="text-body-sm text-text-secondary">
          We&apos;ll email you a link to set a new password.
        </p>
      </div>

      {/* 2. Success Feedback or Form */}
      {isSubmitted ? (
        <div className="flex flex-col gap-4 rounded-2xl bg-purple-50/50 p-6 text-center border border-purple-100">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-body-md font-semibold text-text-primary">
              Check your inbox
            </h3>
            <p className="text-body-sm text-text-secondary">
              We have sent a reset link to{" "}
              <span className="font-semibold text-text-primary">{email}</span>
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsSubmitted(false)}
            className="mt-2 self-center text-purple-700"
          >
            Didn&apos;t receive email? Try again
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email address"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!email || isLoading}
          >
            Submit
          </Button>
        </form>
      )}

      {/* 3. Navigation */}
      <div className="flex justify-center pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-caption font-semibold text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
