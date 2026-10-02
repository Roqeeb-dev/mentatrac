import { WellnessCategory } from "../types/wellness";

interface CategoryTheme {
  iconBg: string;
  badgeText: string;
}

export const CATEGORY_THEME: Record<
  Exclude<WellnessCategory, "All">,
  CategoryTheme
> = {
  Breathing: { iconBg: "bg-sky-50", badgeText: "text-sky-600" },
  Movement: { iconBg: "bg-emerald-50", badgeText: "text-emerald-600" },
  Sleep: { iconBg: "bg-violet-50", badgeText: "text-violet-600" },
  Reflection: { iconBg: "bg-amber-50", badgeText: "text-amber-600" },
  Hydration: { iconBg: "bg-blue-50", badgeText: "text-blue-600" },
  Affirmation: { iconBg: "bg-purple-50", badgeText: "text-purple-600" },
};
