import { apiClient } from "@/lib/api/client";
import { CheckInPayload, CheckInRecord, MoodScore } from "../types/checkIn";

const MOOD_TO_API: Record<MoodScore, string> = {
  1: "ONE",
  2: "TWO",
  3: "THREE",
  4: "FOUR",
  5: "FIVE",
};

const API_TO_MOOD: Record<string, MoodScore> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

interface ApiCheckInRecord {
  id: string;
  userId: string;
  mood: string;
  notes: string;
  emotions: string[];
  influencers: string[];
  date: string;
  createdAt: string;
}

function fromApiRecord(record: ApiCheckInRecord): CheckInRecord {
  return {
    id: record.id,
    userId: record.userId,
    mood: API_TO_MOOD[record.mood] ?? 3,
    note: record.notes,
    emotions: record.emotions as CheckInRecord["emotions"],
    influencers: record.influencers as CheckInRecord["influencers"],
    date: record.date,
    createdAt: record.createdAt,
  };
}

export const checkInService = {
  /**
   * Fetch all check-in records for the current user.
   */
  async getCheckIns(): Promise<CheckInRecord[]> {
    const data = await apiClient.get<ApiCheckInRecord[]>("/api/v1/check-ins");
    return data.map(fromApiRecord);
  },

  async submitCheckIn(payload: CheckInPayload): Promise<CheckInRecord> {
    if (!payload.mood) {
      throw new Error("Mood selection is required to submit a check-in.");
    }

    const body = {
      mood: MOOD_TO_API[payload.mood],
      notes: payload.note ?? "",
      emotions: payload.emotions,
      influencers: payload.influencers,
      date: payload.date ?? new Date().toISOString().split("T")[0],
    };

    const record = await apiClient.post<ApiCheckInRecord>(
      "/api/v1/check-ins",
      body,
    );
    return fromApiRecord(record);
  },
};
