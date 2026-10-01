import Link from "next/link";
import Image from "next/image";
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
        <div className="relative h-8 w-8 shrink-0 transition-transform hover:scale-105">
          <Image
            src="/logo.png"
            alt="Mentatrac Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <>
          {showIcon && (
            <div className="relative h-8 w-8 shrink-0 transition-transform hover:scale-105">
              <Image
                src="/logo.png"
                alt="Mentatrac Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
          <span
            className={cn(
              "font-serif text-xl font-bold tracking-tight truncate",
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
