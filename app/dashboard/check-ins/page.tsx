import type { Metadata } from "next";
import { CheckInHistory } from "@/features/check-in/components/history/CheckInHistory";

export const metadata: Metadata = { title: "Check-ins" };

export default function CheckInsPage() {
  return <CheckInHistory />;
}
