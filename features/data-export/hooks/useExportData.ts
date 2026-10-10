"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@/stores/toast-store";
import { dataExportService } from "../services/dataExport.service";
import { downloadFile, extractTables, toCsv } from "../lib/csv";
import type { DataExport } from "../types/data-export";

export type ExportFormat = "json" | "csv";

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 15;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const isReady = (e: DataExport) => e.status.toUpperCase() === "READY";
const isFailed = (e: DataExport) =>
  ["FAILED", "ERROR"].includes(e.status.toUpperCase());

async function fetchReadyExport(): Promise<DataExport> {
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
}

export function useExportData() {
  return useMutation<DataExport, Error, ExportFormat>({
    mutationFn: () => fetchReadyExport(),
    onSuccess: (exp, format) => {
      const payload = exp.payload ?? {};
      const date = new Date().toISOString().slice(0, 10);

      if (format === "json") {
        downloadFile(
          JSON.stringify(payload, null, 2),
          `mentatrac-export-${date}.json`,
          "application/json",
        );
        toast.success("Your data export has been downloaded.");
        return;
      }

      const tables = extractTables(payload);
      if (tables.length === 0) {
        toast.error("There's no data to export as CSV yet.");
        return;
      }

      // Browsers may ask permission for several downloads, so stagger them
      tables.forEach((t, i) => {
        setTimeout(
          () =>
            downloadFile(
              toCsv(t.rows),
              `mentatrac-${t.name}-${date}.csv`,
              "text/csv;charset=utf-8",
            ),
          i * 400,
        );
      });
      toast.success(
        tables.length === 1
          ? "Your CSV export has been downloaded."
          : `Downloading ${tables.length} CSV files.`,
      );
    },
    onError: (error) => {
      toast.error(error.message || "Couldn't export your data. Try again.");
    },
  });
}
