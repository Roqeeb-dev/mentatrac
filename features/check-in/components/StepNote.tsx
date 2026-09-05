"use client";

import { Button } from "@/components/ui/Button";

interface StepNoteProps {
  note: string;
  onNoteChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function StepNote({
  note,
  onNoteChange,
  onBack,
  onSubmit,
  isSubmitting,
}: StepNoteProps) {
  const MAX_CHARS = 300;

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
          Anything to add?
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          A short note can reveal a lot over time.
        </p>
      </div>

      <div className="relative">
        <textarea
          rows={4}
          maxLength={MAX_CHARS}
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="How does this feel in more words?"
          className="w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-800 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none placeholder:text-slate-400"
        />
        <span className="absolute bottom-3 right-4 text-[10px] font-semibold text-slate-400">
          {note.length}/{MAX_CHARS}
        </span>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          variant="ghost"
          size="sm"
          className="!text-slate-400 hover:!text-slate-600"
        >
          &larr; Back
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="primary"
        >
          {isSubmitting ? "Saving..." : "Save check-in ✓"}
        </Button>
      </div>
    </div>
  );
}
