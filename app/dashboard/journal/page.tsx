import type { Metadata } from "next";
import { JournalShell } from "@/features/journal/components/JournalShell";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Reflect on your daily thoughts, log personal entries, and review past reflections.",
};

export default function JournalPage() {
  return <JournalShell />;
}
