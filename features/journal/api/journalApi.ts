import { apiClient } from "@/lib/api/client";
import {
  CreateJournalInput,
  JournalEntry,
  UpdateJournalInput,
} from "../types/journal";

const JOURNAL_ROUTES = {
  list: "/journal/entries",
  create: "/journal/entries",
  update: (id: string) => `/journal/entries/${id}`,
  remove: (id: string) => `/journal/entries/${id}`,
};

export const journalApi = {
  list: () => apiClient.get<JournalEntry[]>(JOURNAL_ROUTES.list),

  create: (input: CreateJournalInput) =>
    apiClient.post<JournalEntry>(JOURNAL_ROUTES.create, input),

  update: (id: string, updates: UpdateJournalInput) =>
    apiClient.patch<JournalEntry>(JOURNAL_ROUTES.update(id), updates),

  remove: (id: string) => apiClient.delete<void>(JOURNAL_ROUTES.remove(id)),
};
