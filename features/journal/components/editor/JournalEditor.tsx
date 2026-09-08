"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Smile } from "lucide-react";
import { JournalEntry, CreateJournalInput } from "../../types/journal";

interface JournalEditorProps {
  entry: JournalEntry | null;
  isCreating: boolean;
  onSave: (input: CreateJournalInput) => void;
  onUpdate: (id: string, updates: Partial<CreateJournalInput>) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

const EMOJI_CATEGORIES = {
  Feelings: ["😤", "💜", "❤️", "🖤", "💛", "💙", "🤍", "✨", "⭐"],
  Nature: ["💎", "🌀", "♾️", "🪄", "🔮", "🧿", "☯️", "🌒", "💧"],
  Symbols: ["🔑"],
};

// Empty string = "no emoji chosen yet", distinct from any real emoji value.
const NO_EMOJI = "";

export function JournalEditor({
  entry,
  isCreating,
  onSave,
  onUpdate,
  onCancel,
}: JournalEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(NO_EMOJI);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeTab, setActiveTab] =
    useState<keyof typeof EMOJI_CATEGORIES>("Feelings");

  // Sync state safely when entry changes or when starting a new entry
  useEffect(() => {
    if (entry) {
      setTitle(entry.title || "");
      setContent(entry.content || "");
      setSelectedEmoji(entry.emoji || NO_EMOJI);
    } else if (isCreating) {
      setTitle("");
      setContent("");
      setSelectedEmoji(NO_EMOJI);
    }
  }, [entry?.id, isCreating]);

  const charCount = content.length;
  const wordCount = useMemo(() => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  }, [content]);

  const handleSave = () => {
    const finalTitle = title.trim() || "Untitled Entry";
    const emoji = selectedEmoji || undefined;

    // Mirrors the useEffect's priority: an existing entry always wins over
    // a stale `isCreating` flag, so this can never fork into "update vs
    // duplicate" depending on which check runs first.
    if (entry) {
      onUpdate(entry.id, { title: finalTitle, content, emoji });
    } else if (isCreating) {
      onSave({ title: finalTitle, content, emoji: emoji ?? "" });
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

  const hasEmoji = selectedEmoji !== NO_EMOJI;

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-4 md:px-8 py-5 flex items-center justify-between border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile-only back button: returns to the entry list */}
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
        {/* Large emoji display — only once one has actually been chosen */}
        {hasEmoji && (
          <div className="flex justify-center mb-4">
            <span className="text-4xl leading-none">{selectedEmoji}</span>
          </div>
        )}

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
        <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col space-y-2 shrink-0">
          <div className="flex items-center justify-between relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className={
                  hasEmoji
                    ? "flex items-center justify-center w-8 h-8 rounded-full border border-slate-200/80 bg-white text-base hover:bg-slate-50 transition-colors shadow-2xs"
                    : "flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                }
                aria-label="Choose an emoji"
              >
                {hasEmoji ? (
                  <span className="leading-none">{selectedEmoji}</span>
                ) : (
                  <>
                    <Smile className="w-4 h-4 text-slate-400" />
                    <span>Add emoji</span>
                  </>
                )}
              </button>

              {/* Emoji Picker Popover */}
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3 text-xs font-medium text-slate-500">
                    {(
                      Object.keys(
                        EMOJI_CATEGORIES,
                      ) as (keyof typeof EMOJI_CATEGORIES)[]
                    ).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`pb-1 transition-colors ${
                          activeTab === tab
                            ? "text-[#5B4DFB] font-bold border-b-2 border-[#5B4DFB]"
                            : "hover:text-slate-800"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {EMOJI_CATEGORIES[activeTab].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setSelectedEmoji(emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-xl p-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                  {hasEmoji && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEmoji(NO_EMOJI);
                        setShowEmojiPicker(false);
                      }}
                      className="mt-3 w-full text-center text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Remove emoji
                    </button>
                  )}
                </div>
              )}
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              {charCount} chars · {wordCount} words
            </span>
          </div>

          <p className="text-[11px] text-slate-400 font-normal">
            Pick an emoji below that captures the feeling or theme of this
            entry.
          </p>
        </div>
      </div>
    </div>
  );
}
