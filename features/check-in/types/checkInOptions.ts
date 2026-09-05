import {
  MoodOption,
  EmotionCategory,
  InfluencerCategory,
} from "../types/checkIn";

export const MOODS: MoodOption[] = [
  { value: 5, label: "Radiant", subtitle: "Feeling amazing", emoji: "✨" },
  { value: 4, label: "Good", subtitle: "Doing well", emoji: "😊" },
  { value: 3, label: "Okay", subtitle: "Getting by", emoji: "😐" },
  { value: 2, label: "Tough", subtitle: "Struggling a bit", emoji: "😔" },
  { value: 1, label: "Hard", subtitle: "Really difficult", emoji: "😫" },
];

export const EMOTIONS: EmotionCategory[] = [
  "Grateful",
  "Anxious",
  "Excited",
  "Stressed",
  "Content",
  "Overwhelmed",
  "Hopeful",
  "Lonely",
  "Energized",
  "Tired",
  "Focused",
  "Irritable",
  "Calm",
  "Sad",
  "Confident",
  "Frustrated",
  "Peaceful",
  "Worried",
];

export const INFLUENCERS: InfluencerCategory[] = [
  "Work",
  "Sleep",
  "Exercise",
  "Family",
  "Social",
  "Health",
  "Finance",
  "Weather",
  "Food",
  "Relationships",
  "School",
  "News",
  "Self-care",
  "Goals",
  "Past",
  "Future",
];
