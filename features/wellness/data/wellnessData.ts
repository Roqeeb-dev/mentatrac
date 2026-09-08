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
  whyItWorks:
    "Extending your exhale beyond your inhale signals your vagus nerve to shift your body out of fight-or-flight and into rest-and-digest mode, lowering heart rate within a few cycles.",
  steps: [
    "Sit or lie down somewhere comfortable and exhale fully through your mouth.",
    "Inhale quietly through your nose for 4 counts.",
    "Hold your breath for 7 counts.",
    "Exhale completely through your mouth for 8 counts, making a whoosh sound.",
    "Repeat the cycle 3-4 times.",
  ],
};

export const wellnessTips: WellnessTip[] = [
  {
    id: "4-7-8-breathing-card",
    title: "4-7-8 Breathing Technique",
    category: "Breathing",
    duration: "3 min",
    description:
      "Inhale for 4 counts, hold for 7, exhale slowly for 8. This activates your parasympathetic nervous system and reduces anxiety within minutes.",
    whyItWorks:
      "Extending your exhale beyond your inhale signals your vagus nerve to shift your body out of fight-or-flight and into rest-and-digest mode, lowering heart rate within a few cycles.",
    steps: [
      "Sit or lie down somewhere comfortable and exhale fully through your mouth.",
      "Inhale quietly through your nose for 4 counts.",
      "Hold your breath for 7 counts.",
      "Exhale completely through your mouth for 8 counts, making a whoosh sound.",
      "Repeat the cycle 3-4 times.",
    ],
  },
  {
    id: "10-minute-walk-reset",
    title: "10-Minute Walk Reset",
    category: "Movement",
    duration: "10 min",
    description:
      "A short walk outside can lower your cortisol levels significantly.",
    whyItWorks:
      "Light rhythmic movement combined with natural light exposure lowers circulating cortisol and helps regulate your circadian rhythm, even on an overcast day.",
    steps: [
      "Step outside — a balcony, yard, or street all count.",
      "Walk at an easy, unhurried pace for 10 minutes.",
      "Leave your phone in your pocket; let your mind wander instead of scrolling.",
      "Notice three things you can see, hear, or smell along the way.",
    ],
  },
  {
    id: "wind-down-ritual",
    title: "Wind-Down Ritual",
    category: "Sleep",
    duration: "15 min",
    description:
      "Set your phone to grayscale an hour before bed. Your brain will naturally start producing melatonin.",
    whyItWorks:
      "Blue light suppresses melatonin production by mimicking daylight. Removing color makes your phone less visually rewarding, which also tends to shorten how long you scroll.",
    steps: [
      "An hour before bed, switch your phone's display to grayscale in accessibility settings.",
      "Dim the lights in your room to a warm, low setting.",
      "Put your phone on the opposite side of the room, not on your nightstand.",
      "Spend the last 15 minutes reading, stretching, or journaling instead.",
    ],
  },
  {
    id: "three-wins-journaling",
    title: "Three Wins Journaling",
    category: "Reflection",
    duration: "5 min",
    description:
      "Before bed, write three specific things that went well today. This trains your brain to notice positive patterns consistently over time.",
    whyItWorks:
      "Your brain has a negativity bias by default — it remembers threats better than wins. Deliberately recalling specific positives counteracts that bias and has been linked to improved mood over consecutive weeks of practice.",
    steps: [
      "Open your journal a few minutes before bed.",
      "Write down three specific moments from today that went well, however small.",
      "For each one, add a sentence on why it mattered or what you did to make it happen.",
    ],
  },
  {
    id: "morning-hydration-reset",
    title: "Morning Hydration Reset",
    category: "Hydration",
    duration: "1 min",
    description:
      "Drink 500ml of water within 30 minutes of waking. Mild dehydration directly impacts energy levels and mood stability.",
    whyItWorks:
      "You lose water overnight through breathing and sweat with nothing to replace it for 7-8 hours. Even 1-2% dehydration measurably affects concentration and mood before you'd consciously feel thirsty.",
    steps: [
      "Keep a glass or bottle of water by your bed the night before.",
      "Drink it first thing, before coffee or tea.",
      "Aim for roughly 500ml — about two standard glasses.",
    ],
  },
  {
    id: "todays-affirmation",
    title: "Today's Affirmation",
    category: "Affirmation",
    duration: "1 min",
    description:
      "I am doing the best I can with what I have, and that is enough.",
  },
  {
    id: "box-breathing-for-focus",
    title: "Box Breathing for Focus",
    category: "Breathing",
    duration: "4 min",
    description:
      "Inhale for 4, hold for 4, exhale for 4, hold for 4. Used by Navy SEALs to regain focus under pressure.",
    whyItWorks:
      "Equal-count breathing steadies an irregular breathing pattern, which is often the physical marker of stress before you've consciously registered feeling stressed.",
    steps: [
      "Exhale all the air from your lungs.",
      "Inhale through your nose for 4 counts.",
      "Hold for 4 counts.",
      "Exhale through your mouth for 4 counts.",
      "Hold empty for 4 counts, then repeat for 4-5 cycles.",
    ],
  },
];
