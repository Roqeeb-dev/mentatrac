import type { Metadata } from "next";
import ReportsClient from "./Client";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Analyze long-term mood analytics, wellness trends, and mental health reports.",
};

export default function ReportsPage() {
  return <ReportsClient />;
}
