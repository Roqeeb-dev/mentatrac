import type { Metadata } from "next";
import DashboardClient from "./Client";

export default function Dashboard() {
  return <DashboardClient />;
}

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of your daily mood trends, check-in streaks, and wellness insights.",
};
