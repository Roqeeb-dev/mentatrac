"use client";

import { useToastStore } from "@/stores/toast-store";
import Toast from "./Toast";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-[9999] flex flex-col gap-2 sm:left-auto sm:right-4">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast toast={t} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
}
