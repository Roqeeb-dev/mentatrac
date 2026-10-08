import { useMutation, useQueryClient } from "@tanstack/react-query";
import { journalApi } from "../api/journalApi";
import { journalKeys } from "./useJournalEntries";
import {
  CreateJournalInput,
  JournalEntry,
  UpdateJournalInput,
} from "../types/journal";
import { toast } from "@/stores/toast-store";

const messageOf = (err: unknown, fallback: string) =>
  err instanceof Error && err.message ? err.message : fallback;

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
      toast.success("Journal entry saved");
    },
    onError: (err) =>
      toast.error(messageOf(err, "Couldn't save your journal entry.")),
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
      toast.success("Journal entry updated");
    },
    onError: (err) =>
      toast.error(messageOf(err, "Couldn't update your journal entry.")),
  });

  const deleteEntry = useMutation({
    mutationFn: (id: string) => journalApi.remove(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<JournalEntry[]>(journalKeys.all, (old = []) =>
        old.filter((e) => e.id !== id),
      );
      invalidate();
      toast.success("Journal entry deleted");
    },
    onError: (err) =>
      toast.error(messageOf(err, "Couldn't delete your journal entry.")),
  });

  return { createEntry, updateEntry, deleteEntry };
}
