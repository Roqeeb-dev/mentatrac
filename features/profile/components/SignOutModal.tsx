"use client";

import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function SignOutModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs transition-opacity">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-[440px] rounded-3xl bg-white p-6 shadow-2xl transition-all sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <LogOut className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Sign out</h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <p className="mt-4 text-xs leading-relaxed text-slate-500">
          You will be signed out of Mentatrac. Your data will remain safely
          stored on this device.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={loading}
            className="w-1/2 rounded-2xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onConfirm}
            loading={loading}
            className="w-1/2 rounded-2xl"
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
