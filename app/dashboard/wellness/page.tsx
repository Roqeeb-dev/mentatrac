import type { Metadata } from "next";
import WellnessClient from "./Client";

export const metadata: Metadata = {
  title: "Wellness",
  description:
    "Explore guided breathing techniques, mindfulness exercises, and wellness tools.",
};

export default function WellnessPage() {
  return <WellnessClient />;
}
