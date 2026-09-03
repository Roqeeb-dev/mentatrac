import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showIcon?: boolean;
  isCollapsed?: boolean;
}

export function Logo({
  className,
  variant = "light",
  showIcon = true,
  isCollapsed = false,
}: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "inline-flex items-center focus:outline-none transition-all duration-300",
        isCollapsed ? "justify-center" : "gap-2.5",
        className,
      )}
    >
      {isCollapsed ? (
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl font-display text-lg font-extrabold tracking-wider shadow-sm transition-transform hover:scale-105",
            variant === "light"
              ? "bg-gradient-to-br from-purple-500/40 to-indigo-600/40 text-white border border-white/20 backdrop-blur-md"
              : "bg-purple-600 text-white",
          )}
        >
          M
        </div>
      ) : (
        <>
          {showIcon && (
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl transition-transform hover:scale-105 shrink-0",
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
              "font-display text-xl font-bold tracking-tight truncate",
              variant === "light" ? "text-white" : "text-text-primary",
            )}
          >
            Mentatrac
          </span>
        </>
      )}
    </Link>
  );
}
