"use client";

import { BookOpen, Plus } from "lucide-react";

interface JournalEmptyStateProps {
  onStartNew: () => void;
}

export function JournalEmptyState({ onStartNew }: JournalEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 text-slate-400 shadow-xs">
        <BookOpen className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 font-serif">
        Select an entry to read
      </h3>
      <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
        Or start writing something new to record your thoughts today.
      </p>
      <button
        onClick={onStartNew}
        className="mt-6 flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-full text-xs font-semibold hover:bg-violet-700 transition-colors shadow-xs"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Create entry</span>
      </button>
    </div>
  );
}
