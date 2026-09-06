"use client";

import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface TopbarProps {
  title?: string;
  onOpenMobileMenu?: () => void;
  onCheckIn?: () => void;
}

export function Topbar({
  title = "Dashboard",
  onOpenMobileMenu,
  onCheckIn,
}: TopbarProps) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="rounded-lg p-2 text-text-secondary hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <h1 className="font-display text-body-lg font-bold text-text-primary lg:text-display-sm">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-caption font-semibold text-text-tertiary sm:inline-block">
          {formattedDate}
        </span>
        {onCheckIn && (
          <Button
            variant="primary"
            size="sm"
            onClick={onCheckIn}
            className="rounded-full px-4"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Check-in
          </Button>
        )}
      </div>
    </header>
  );
}
