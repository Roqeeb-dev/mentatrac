"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/stores/toast-store";
import { dataExportService } from "../services/dataExport.service";
import type { DataExport } from "../types/data-export";

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 15;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const isReady = (e: DataExport) => e.status.toUpperCase() === "READY";
const isFailed = (e: DataExport) =>
  ["FAILED", "ERROR"].includes(e.status.toUpperCase());

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function useExportData() {
  return useMutation<DataExport, Error, void>({
    mutationFn: async () => {
      let exp = await dataExportService.request();

      for (let i = 0; i < POLL_MAX_ATTEMPTS && !isReady(exp); i++) {
        if (isFailed(exp)) throw new Error("We couldn't prepare your export.");
        await sleep(POLL_INTERVAL_MS);
        exp = await dataExportService.get(exp.id);
      }

      if (isFailed(exp)) throw new Error("We couldn't prepare your export.");
      if (!isReady(exp)) {
        throw new Error(
          "Your export is taking longer than expected. Please try again in a minute.",
        );
      }
      return exp;
    },
    onSuccess: (exp) => {
      const date = new Date().toISOString().slice(0, 10);
      downloadJson(exp.payload ?? {}, `mentatrac-export-${date}.json`);
      toast.success("Your data export has been downloaded.");
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't export your data. Try again.");
    },
  });
}
