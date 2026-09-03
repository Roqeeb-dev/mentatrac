"use client";

import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarProps } from "./Sidebar";
import { Topbar, TopbarProps } from "./Topbar";

export interface DashboardShellProps {
  children: ReactNode;
  sidebarProps: Omit<SidebarProps, "isOpen" | "onClose">;
  topbarProps?: Omit<TopbarProps, "onOpenMobileMenu">;
}

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/journal": "Journal",
  "/dashboard/reports": "Reports",
  "/dashboard/wellness": "Wellness",
  "/dashboard/profile": "Profile",
};

export function DashboardShell({
  children,
  sidebarProps,
  topbarProps,
}: DashboardShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const currentTitle =
    topbarProps?.title ?? ROUTE_TITLES[pathname] ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <Sidebar
        {...sidebarProps}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar
          {...topbarProps}
          title={currentTitle}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
