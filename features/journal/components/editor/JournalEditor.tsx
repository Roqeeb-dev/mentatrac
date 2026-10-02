"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { JournalEntry, CreateJournalInput } from "../../types/journal";

interface JournalEditorProps {
  entry: JournalEntry | null;
  isCreating: boolean;
  onSave: (input: CreateJournalInput) => void;
  onUpdate: (id: string, updates: Partial<CreateJournalInput>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

export function JournalEditor({
  entry,
  isCreating,
  onSave,
  onUpdate,
  onCancel,
}: JournalEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Sync state when entry changes or when starting a new entry
  useEffect(() => {
    if (entry) {
      setTitle(entry.title || "");
      setContent(entry.content || "");
    } else if (isCreating) {
      setTitle("");
      setContent("");
    }
  }, [entry?.id, isCreating]);

  const charCount = content.length;
  const wordCount = useMemo(() => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  }, [content]);

  const handleSave = () => {
    const finalTitle = title.trim() || "Untitled Entry";

    if (entry) {
      onUpdate(entry.id, { title: finalTitle, content });
    } else if (isCreating) {
      onSave({ title: finalTitle, content });
    }
  };

  const formattedDate = useMemo(() => {
    const date = entry ? new Date(entry.createdAt) : new Date();
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [entry]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-4 md:px-8 py-5 flex items-center justify-between border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onCancel}
            className="md:hidden -ml-1 p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Back to journal list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 font-medium truncate">
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Autosaved
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#5B4DFB] text-white rounded-lg text-xs font-semibold hover:bg-[#4A3CE2] transition-colors shadow-xs"
          >
            Save entry
          </button>
        </div>
      </div>

      {/* Main Form Scrollable Content Area */}
      <div className="flex-1 px-4 md:px-8 py-8 max-w-[800px] w-full mx-auto flex flex-col overflow-y-auto min-h-0">
        <div className="space-y-6 pb-6 border-b border-slate-100">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give this entry a title..."
            className="w-full text-2xl font-bold font-serif text-slate-900 placeholder:text-slate-300 border-none outline-none focus:outline-none focus:ring-0 p-0 bg-transparent"
          />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? This is your private space..."
          rows={10}
          className="w-full flex-1 mt-6 text-sm text-slate-700 placeholder:text-slate-300 border-none outline-none resize-none focus:outline-none focus:ring-0 p-0 leading-relaxed bg-transparent min-h-[180px]"
        />

        {/* Bottom Toolbar */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end shrink-0">
          <span className="text-[11px] text-slate-400 font-medium">
            {charCount} chars · {wordCount} words
          </span>
        </div>
      </div>
    </div>
  );
}
