"use client";

import { useState, ReactNode } from "react";
import { Sidebar, SidebarProps } from "./Sidebar";
import { Topbar, TopbarProps } from "./Topbar";

export interface DashboardShellProps {
  children: ReactNode;
  sidebarProps: Omit<SidebarProps, "isOpen" | "onClose">;
  topbarProps?: Omit<TopbarProps, "onOpenMobileMenu">;
}

export function DashboardShell({
  children,
  sidebarProps,
  topbarProps,
}: DashboardShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
