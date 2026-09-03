import type { Metadata } from "next";

export default function Dashboard() {
  return (
    <main>
      <h1>This is the dashboard home page</h1>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of your daily mood trends, check-in streaks, and wellness insights.",
};
