import type { Metadata } from "next";
import ProfileClient from "./Client";

export const metadata: Metadata = {
  title: "Profile & Settings",
  description:
    "Manage your account settings, personal preferences, and notification details.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
