import { apiClient } from "@/lib/api/client";

export interface ApiJournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: string | null;
  tags?: string[];
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiJournalCreateBody {
  title: string;
  content: string;
  mood?: string;
}

export type ApiJournalUpdateBody = Partial<ApiJournalCreateBody>;

const BASE = "/journal-entries";
const LIST_LIMIT = 200;

const JOURNAL_ROUTES = {
  list: BASE,
  create: BASE,
  update: (id: string) => `${BASE}/${id}`,
  remove: (id: string) => `${BASE}/${id}`,
};

export const journalApi = {
  list: () =>
    apiClient.get<ApiJournalEntry[]>(JOURNAL_ROUTES.list, {
      params: { limit: LIST_LIMIT },
    }),

  create: (body: ApiJournalCreateBody) =>
    apiClient.post<ApiJournalEntry>(JOURNAL_ROUTES.create, body),

  update: (id: string, body: ApiJournalUpdateBody) =>
    apiClient.patch<ApiJournalEntry>(JOURNAL_ROUTES.update(id), body),

  remove: (id: string) => apiClient.delete<void>(JOURNAL_ROUTES.remove(id)),
};
