import { WellnessCategory, WellnessTip } from "../types/wellness";

export const WellnessCategories: WellnessCategory[] = [
  "All",
  "Breathing",
  "Movement",
  "Sleep",
  "Reflection",
  "Hydration",
  "Affirmation",
];

export const todaysPick: WellnessTip = {
  id: "4-7-8-breathing",
  title: "4-7-8 Breathing Technique",
  category: "Breathing",
  duration: "3 min",
  description:
    "Inhale for 4 counts, hold for 7, exhale slowly for 8. This activates your parasympathetic nervous system and reduces anxiety within minutes.",
  isTodaysPick: true,
};

export const wellnessTips: WellnessTip[] = [
  {
    id: "4-7-8-breathing-card",
    title: "4-7-8 Breathing Technique",
    category: "Breathing",
    duration: "3 min",
    description:
      "Inhale for 4 counts, hold for 7, exhale slowly for 8. This activates your parasympathetic nervous system and reduces anxiety within minutes.",
  },
  {
    id: "10-minute-walk-reset",
    title: "10-Minute Walk Reset",
    category: "Movement",
    duration: "10 min",
    description:
      "A short walk outside can lower your cortisol levels significantly.",
  },
  {
    id: "wind-down-ritual",
    title: "Wind-Down Ritual",
    category: "Sleep",
    duration: "15 min",
    description:
      "Set your phone to grayscale an hour before bed. Your brain will naturally start producing melatonin.",
  },
  {
    id: "three-wins-journaling",
    title: "Three Wins Journaling",
    category: "Reflection",
    duration: "5 min",
    description:
      "Before bed, write three specific things that went well today. This trains your brain to notice positive patterns consistently over time.",
  },
  {
    id: "morning-hydration-reset",
    title: "Morning Hydration Reset",
    category: "Hydration",
    duration: "1 min",
    description:
      "Drink 500ml of water within 30 minutes of waking. Mild dehydration directly impacts energy levels and mood stability.",
  },
  {
    id: "todays-affirmation",
    title: "Today's Affirmation",
    category: "Affirmation",
    duration: "1 min",
    description:
      '"I am doing the best I can with what I have, and that is enough."',
  },
  {
    id: "box-breathing-for-focus",
    title: "Box Breathing for Focus",
    category: "Breathing",
    duration: "4 min",
    description:
      "Inhale for 4, hold for 4, exhale for 4, hold for 4. Used by Navy SEALs to regain focus under pressure.",
  },
];
