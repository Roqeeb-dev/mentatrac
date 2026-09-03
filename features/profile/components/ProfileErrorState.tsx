import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProfileErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ProfileErrorState({
  message,
  onRetry,
}: ProfileErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center p-6">
      <div className="flex w-full max-w-[480px] flex-col items-center rounded-3xl border border-slate-200/80 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl">
        {/* Decorative Glowing Icon Badge */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 shadow-inner">
          <div className="absolute inset-0 rounded-2xl bg-rose-500/20 blur-lg" />
          <AlertCircle className="relative h-8 w-8" />
        </div>

        {/* Content Section */}
        <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-900">
          Failed to load profile
        </h3>

        <div className="mt-2.5 rounded-xl border border-slate-200/60 bg-slate-50/80 px-4 py-2.5">
          <p className="font-mono text-xs font-medium text-slate-600 break-all">
            {message ||
              "We encountered an issue retrieving your account details. Please try again."}
          </p>
        </div>

        {/* Reusable Button with Left Icon prop */}
        <Button
          variant="primary"
          size="md"
          onClick={onRetry}
          className="mt-6 font-medium shadow-md transition-all hover:shadow-indigo-500/25"
          leftIcon={<RefreshCw className="h-4 w-4 shrink-0 text-white" />}
        >
          Retry Loading
        </Button>
      </div>
    </div>
  );
}
