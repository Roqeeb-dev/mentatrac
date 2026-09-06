"use client";

import { Plus } from "lucide-react";

interface SidebarHeaderProps {
  onStartNewEntry: () => void;
}

export function SidebarHeader({ onStartNewEntry }: SidebarHeaderProps) {
  return (
    <div className="p-4 flex items-center justify-between border-b border-slate-100/80">
      <h1 className="text-xl font-bold font-serif text-slate-900">Journal</h1>
      <button
        onClick={onStartNewEntry}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 text-white rounded-full text-xs font-semibold hover:bg-violet-700 transition-colors shadow-sm"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>New entry</span>
      </button>
    </div>
  );
}
