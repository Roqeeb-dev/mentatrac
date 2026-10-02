import { apiClient } from "@/lib/api/client";

export interface ApiJournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiJournalCreateBody {
  title: string;
  content: string;
  mood?: string;
}

export type ApiJournalUpdateBody = Partial<ApiJournalCreateBody>;

const JOURNAL_ROUTES = {
  list: "/journal",
  create: "/journal",
  update: (id: string) => `/journal/${id}`,
  remove: (id: string) => `/journal/${id}`,
};

export const journalApi = {
  list: () => apiClient.get<ApiJournalEntry[]>(JOURNAL_ROUTES.list),

  create: (body: ApiJournalCreateBody) =>
    apiClient.post<ApiJournalEntry>(JOURNAL_ROUTES.create, body),

  update: (id: string, body: ApiJournalUpdateBody) =>
    apiClient.patch<ApiJournalEntry>(JOURNAL_ROUTES.update(id), body),

  remove: (id: string) => apiClient.delete<void>(JOURNAL_ROUTES.remove(id)),
};
