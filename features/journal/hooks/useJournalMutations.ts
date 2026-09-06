import { useMutation, useQueryClient } from "@tanstack/react-query";
import { journalApi } from "../api/journalApi";
import { journalKeys } from "./useJournalEntries";
import { CreateJournalInput, UpdateJournalInput } from "../types/journal";

export function useJournalMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: journalKeys.all });

  const createEntry = useMutation({
    mutationFn: (input: CreateJournalInput) => journalApi.create(input),
    onSuccess: invalidate,
  });

  const updateEntry = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateJournalInput;
    }) => journalApi.update(id, updates),
    onSuccess: invalidate,
  });

  const deleteEntry = useMutation({
    mutationFn: (id: string) => journalApi.remove(id),
    onSuccess: invalidate,
  });

  return { createEntry, updateEntry, deleteEntry };
}
