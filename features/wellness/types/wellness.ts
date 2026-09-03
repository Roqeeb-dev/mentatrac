export type WellnessCategory =
  | "All"
  | "Breathing"
  | "Movement"
  | "Sleep"
  | "Reflection"
  | "Hydration"
  | "Affirmation";

export interface WellnessTip {
  id: string;
  title: string;
  category: Exclude<WellnessCategory, "All">;
  duration: string;
  description: string;
  isTodaysPick?: boolean;
}
