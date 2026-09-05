import { useQuery } from "@tanstack/react-query";
import { journalApi } from "../api/journalApi";

export const journalKeys = {
  all: ["journal", "entries"] as const,
};

export function useJournalEntries() {
  return useQuery({
    queryKey: journalKeys.all,
    queryFn: journalApi.list,
  });
}
