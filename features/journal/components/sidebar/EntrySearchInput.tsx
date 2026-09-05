"use client";

import { Search } from "lucide-react";

interface EntrySearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function EntrySearchInput({ value, onChange }: EntrySearchInputProps) {
  return (
    <div className="relative">
      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search entries..."
        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200/80 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500"
      />
    </div>
  );
}
