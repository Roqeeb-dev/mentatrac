"use client";

import { useState } from "react";

const EMOJI_CATEGORIES = {
  Feelings: ["😤", "💜", "❤️", "🖤", "💛", "💙", "🤍", "✨", "⭐"],
  Nature: ["💎", "🌀", "♾️", "🪄", "🔮", "🧿", "☯️", "🌒", "💧"],
  Symbols: ["🔑"],
};

type EmojiCategory = keyof typeof EMOJI_CATEGORIES;

interface EmojiPickerPopoverProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPickerPopover({
  onSelect,
  onClose,
}: EmojiPickerPopoverProps) {
  const [activeTab, setActiveTab] = useState<EmojiCategory>("Symbols");

  return (
    <div className="absolute bottom-12 left-0 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 animate-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3 text-xs font-medium text-slate-500">
        {(Object.keys(EMOJI_CATEGORIES) as EmojiCategory[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-1 transition-colors ${
              activeTab === tab
                ? "text-violet-600 font-bold border-b-2 border-violet-600"
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
              onSelect(emoji);
              onClose();
            }}
            className="text-xl p-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
