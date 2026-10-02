import { useMutation, useQueryClient } from "@tanstack/react-query";
import { journalApi } from "../api/journalApi";
import { journalKeys } from "./useJournalEntries";
import {
  CreateJournalInput,
  JournalEntry,
  UpdateJournalInput,
} from "../types/journal";

export function useJournalMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: journalKeys.all });

  const createEntry = useMutation({
    mutationFn: (input: CreateJournalInput) => journalApi.create(input),
    onSuccess: (created) => {
      queryClient.setQueryData<JournalEntry[]>(journalKeys.all, (old = []) => [
        created,
        ...old,
      ]);

      invalidate();
    },
  });

  const updateEntry = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateJournalInput;
    }) => journalApi.update(id, updates),
    onSuccess: (updated) => {
      queryClient.setQueryData<JournalEntry[]>(journalKeys.all, (old = []) =>
        old.map((e) => (e.id === updated.id ? updated : e)),
      );
      invalidate();
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: string) => journalApi.remove(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<JournalEntry[]>(journalKeys.all, (old = []) =>
        old.filter((e) => e.id !== id),
      );
      invalidate();
    },
  });

  return { createEntry, updateEntry, deleteEntry };
}
