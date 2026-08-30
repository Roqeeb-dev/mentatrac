"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      // Call your reset password API endpoint here
      // await authService.resetPassword({ password });
      setIsSuccess(true);

      // Redirect after brief delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to reset password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Reset Password
        </h1>
        <p className="text-body-sm text-text-secondary">
          We&apos;ll email you a link to set a new password.
        </p>
      </div>

      {/* 2. Success Banner or Form */}
      {isSuccess ? (
        <div className="flex flex-col gap-4 rounded-2xl bg-purple-50/50 p-6 text-center border border-purple-100">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-body-md font-semibold text-text-primary">
              Password updated
            </h3>
            <p className="text-body-sm text-text-secondary">
              Your password has been reset successfully. Redirecting to login...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <div className="rounded-xl bg-error-light p-3 text-caption font-medium text-error">
              {errorMessage}
            </div>
          )}

          <Input
            label="Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={
              confirmPassword && password !== confirmPassword
                ? "Passwords do not match"
                : undefined
            }
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={
                !password ||
                !confirmPassword ||
                password !== confirmPassword ||
                isLoading
              }
            >
              Reset password
            </Button>
          </div>
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
