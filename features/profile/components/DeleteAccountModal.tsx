"use client";

import { useEffect, useState } from "react";
import { X, TriangleAlert, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const CONFIRM_WORD = "DELETE";

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  const [confirmText, setConfirmText] = useState("");

  // Start fresh every time the modal opens
  useEffect(() => {
    if (isOpen) setConfirmText("");
  }, [isOpen]);

  if (!isOpen) return null;

  const canDelete = confirmText === CONFIRM_WORD && !loading;
  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs transition-opacity">
      <div className="fixed inset-0" onClick={handleClose} />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        className="relative w-full max-w-[440px] rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <h2
              id="delete-account-title"
              className="text-lg font-bold text-slate-900"
            >
              Delete account
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Warning */}
        <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
          <p className="text-xs font-semibold text-rose-600">
            This action is permanent and cannot be undone.
          </p>
          <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-600">
            <li>• Your check-ins, journal entries and reports will be lost.</li>
            <li>• Your streak and wellness score will be removed.</li>
            <li>• You will be signed out on every device.</li>
          </ul>
        </div>

        {/* Type to confirm */}
        <div className="mt-5">
          <label
            htmlFor="delete-confirm"
            className="text-xs font-medium text-slate-500"
          >
            Type{" "}
            <span className="font-bold text-slate-800">{CONFIRM_WORD}</span> to
            confirm
          </label>
          <input
            id="delete-confirm"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            disabled={loading}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder={CONFIRM_WORD}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 disabled:bg-slate-50"
          />
        </div>

        {/* Actions */}
        <div className="mt-7 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="w-1/2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!canDelete}
            className="flex w-1/2 items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-rose-200"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
