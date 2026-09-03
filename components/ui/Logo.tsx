import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showIcon?: boolean;
}

export function Logo({
  className,
  variant = "light",
  showIcon = true,
}: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "inline-flex items-center gap-2.5 focus:outline-none",
        className,
      )}
    >
      {showIcon && (
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl transition-transform hover:scale-105",
            variant === "light"
              ? "bg-purple-600/30 text-purple-300 backdrop-blur-md"
              : "bg-purple-600 text-white",
          )}
        >
          <Sparkles className="h-4 w-4 fill-current" />
        </div>
      )}
      <span
        className={cn(
          "font-display text-xl font-bold tracking-tight",
          variant === "light" ? "text-white" : "text-text-primary",
        )}
      >
        Mentatrac
      </span>
    </Link>
  );
}
