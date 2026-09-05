"use client";

import { useState, useEffect, useMemo } from "react";
import {
  JournalEntry,
  CreateJournalInput,
  UpdateJournalInput,
} from "../../types/journal";
import { EmojiPickerPopover } from "./EmojiPickerPopover";

interface JournalEditorProps {
  entry: JournalEntry | null;
  isCreating: boolean;
  onSave: (input: CreateJournalInput) => void;
  onUpdate: (id: string, updates: UpdateJournalInput) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export function JournalEditor({
  entry,
  isCreating,
  onSave,
  onUpdate,
  onCancel,
  onDelete,
}: JournalEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💙");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title || "");
      setContent(entry.content || "");
      setSelectedEmoji(entry.emoji || "💙");
    } else if (isCreating) {
      setTitle("");
      setContent("");
      setSelectedEmoji("💙");
    }
  }, [entry, isCreating]);

  const charCount = content.length;
  const wordCount = useMemo(() => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  }, [content]);

  const handleSave = () => {
    if (!title.trim()) return;

    if (isCreating) {
      onSave({ title, content, emoji: selectedEmoji });
    } else if (entry) {
      onUpdate(entry.id, { title, content, emoji: selectedEmoji });
    }
  };

  const formattedDate = useMemo(() => {
    const date = entry ? new Date(entry.createdAt) : new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [entry]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <div className="px-8 py-5 flex items-center justify-between border-b border-slate-100/60">
        <span className="text-xs text-slate-400 font-medium">
          {formattedDate}
        </span>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Autosaved
          </span>
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-semibold hover:bg-violet-700 transition-colors shadow-xs"
          >
            Save entry
          </button>
        </div>
      </div>

      <div className="flex-1 p-8 max-w-3xl w-full mx-auto flex flex-col space-y-6">
        {selectedEmoji && (
          <div className="text-5xl my-2 animate-in fade-in duration-200">
            {selectedEmoji}
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give this entry a title..."
          className="w-full text-2xl font-bold font-serif text-slate-900 placeholder:text-slate-300 border-none outline-none focus:ring-0 p-0"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? This is your private space..."
          className="w-full flex-1 text-sm text-slate-700 placeholder:text-slate-300 border-none outline-none resize-none focus:ring-0 p-0 leading-relaxed"
        />

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span className="text-base">{selectedEmoji}</span>
              <span>Add emoji</span>
            </button>

            {showEmojiPicker && (
              <EmojiPickerPopover
                onSelect={setSelectedEmoji}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </div>

          <span className="text-[11px] text-slate-400 font-medium">
            {charCount} chars · {wordCount} words
          </span>
        </div>
      </div>
    </div>
  );
}
