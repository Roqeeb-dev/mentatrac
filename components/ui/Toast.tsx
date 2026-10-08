"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import type { Toast as ToastType } from "@/stores/toast-store";

interface Props {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const config = {
  success: {
    icon: CheckCircle2,
    iconWrap: "bg-emerald-50 text-emerald-500",
    bar: "bg-emerald-500",
  },
  error: {
    icon: XCircle,
    iconWrap: "bg-rose-50 text-rose-500",
    bar: "bg-rose-500",
  },
  info: {
    icon: Info,
    iconWrap: "bg-indigo-50 text-[#5B4DFB]",
    bar: "bg-[#5B4DFB]",
  },
};

const DURATION = 4000;
const EXIT_MS = 300;

export default function Toast({ toast, onRemove }: Props) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const { icon: Icon, iconWrap, bar } = config[toast.type];

  useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 10);
    const leave = setTimeout(() => setLeaving(true), DURATION - EXIT_MS);
    const remove = setTimeout(() => onRemove(toast.id), DURATION);
    return () => {
      clearTimeout(enter);
      clearTimeout(leave);
      clearTimeout(remove);
    };
  }, [toast.id, onRemove]);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onRemove(toast.id), EXIT_MS);
  };

  return (
    <div
      role={toast.type === "error" ? "alert" : "status"}
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 ease-out sm:w-80 ${
        visible && !leaving
          ? "translate-x-0 opacity-100"
          : "translate-x-8 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <p className="flex-1 pt-1 text-xs font-medium leading-relaxed text-slate-700">
          {toast.message}
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="mt-1 shrink-0 text-slate-300 transition-colors hover:text-slate-500"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-0.5 ${bar}`}
        style={{ animation: `toast-shrink ${DURATION}ms linear forwards` }}
      />
    </div>
  );
}
