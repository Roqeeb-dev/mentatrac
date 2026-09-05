export type MoodScore = 5 | 4 | 3 | 2 | 1;

export interface MoodOption {
  value: MoodScore;
  label: "Radiant" | "Good" | "Okay" | "Tough" | "Hard";
  subtitle: string;
  emoji: string;
}

export type EmotionCategory =
  | "Grateful"
  | "Anxious"
  | "Excited"
  | "Stressed"
  | "Content"
  | "Overwhelmed"
  | "Hopeful"
  | "Lonely"
  | "Energized"
  | "Tired"
  | "Focused"
  | "Irritable"
  | "Calm"
  | "Sad"
  | "Confident"
  | "Frustrated"
  | "Peaceful"
  | "Worried";

export type InfluencerCategory =
  | "Work"
  | "Sleep"
  | "Exercise"
  | "Family"
  | "Social"
  | "Health"
  | "Finance"
  | "Weather"
  | "Food"
  | "Relationships"
  | "School"
  | "News"
  | "Self-care"
  | "Goals"
  | "Past"
  | "Future";

export interface CheckInPayload {
  mood: MoodScore;
  emotions: EmotionCategory[];
  influencers: InfluencerCategory[];
  note?: string;
}

export interface CheckInRecord extends CheckInPayload {
  id: string;
  createdAt: string;
}

export type CheckInStep = 1 | 2 | 3 | 4 | 5;
