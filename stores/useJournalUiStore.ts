import { create } from "zustand";
import { JournalFilter } from "../features/journal/types/journal";

interface JournalUiState {
  searchQuery: string;
  activeFilter: JournalFilter;
  selectedId: string | null;
  isCreating: boolean;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: JournalFilter) => void;
  selectEntry: (id: string) => void;
  startNewEntry: () => void;
  exitEditor: () => void;
}

export const useJournalUiStore = create<JournalUiState>((set) => ({
  searchQuery: "",
  activeFilter: "All",
  selectedId: null,
  isCreating: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  selectEntry: (id) => set({ selectedId: id, isCreating: false }),
  startNewEntry: () => set({ isCreating: true, selectedId: null }),
  exitEditor: () => set({ isCreating: false, selectedId: null }),
}));
