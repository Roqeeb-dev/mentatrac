export type DataExport = {
  id: string;
  status: string;
  requestedAt: string;
  completedAt?: string | null;
  payload?: Record<string, unknown> | null;
};
