import { apiClient } from "@/lib/api/client";
import type { DataExport } from "../types/data-export";

export const dataExportService = {
  request: () => apiClient.post<DataExport>("/users/me/export"),

  get: (exportId: string) =>
    apiClient.get<DataExport>(`/users/me/export/${exportId}`),
};
