"use client";

import { useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDeleteModal({
  isOpen,
  title,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={() => !loading && onClose()} />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-entry-title"
        className="relative w-full max-w-[400px] rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
          <Trash2 className="h-5 w-5" />
        </div>
        <h2
          id="delete-entry-title"
          className="mt-4 text-lg font-bold text-slate-900"
        >
          Delete this entry?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          &ldquo;<span className="font-medium text-slate-700">{title}</span>
          &rdquo; will be permanently deleted. This can&apos;t be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-1/2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex w-1/2 items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-70"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
