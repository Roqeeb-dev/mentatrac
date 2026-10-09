import { apiClient } from "@/lib/api/client";
import type {
  CheckInPayload,
  CheckInRecord,
  MoodScore,
} from "../types/checkIn";

const BASE_PATH = "/mood-checkins";
const HISTORY_LIMIT = 200; // API maximum

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
  intensity?: number | null;
  factors?: string[] | null;
  notes?: string | null;
  emotions?: string[] | null;
  influencers?: string[] | null;
  date: string; // "2026-09-07T00:00:00.000Z"
  createdAt: string;
}

// Local calendar date as YYYY-MM-DD (toISOString would give the UTC date)
export function toLocalDateKey(d: Date = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromApiRecord(record: ApiCheckInRecord): CheckInRecord {
  return {
    id: record.id,
    userId: record.userId,
    mood: API_TO_MOOD[record.mood] ?? 3,
    intensity: record.intensity ?? undefined,
    note: record.notes ?? "",
    emotions: (record.emotions ?? []) as CheckInRecord["emotions"],
    influencers: (record.influencers ?? []) as CheckInRecord["influencers"],
    date: record.date,
    createdAt: record.createdAt,
  };
}

export const checkInService = {
  /** Fetch check-in history for the current user (API max: 200 records). */
  async getCheckIns(): Promise<CheckInRecord[]> {
    const data = await apiClient.get<ApiCheckInRecord[]>(BASE_PATH, {
      params: { limit: HISTORY_LIMIT },
    });
    return data.map(fromApiRecord);
  },

  async submitCheckIn(payload: CheckInPayload): Promise<CheckInRecord> {
    if (!payload.mood) {
      throw new Error("Mood selection is required to submit a check-in.");
    }

    // The API rejects unknown fields, so only send documented ones
    const body: Record<string, unknown> = {
      mood: MOOD_TO_API[payload.mood],
      emotions: payload.emotions,
      influencers: payload.influencers,
      date: payload.date ?? toLocalDateKey(),
    };

    const notes = payload.note?.trim();
    if (notes) body.notes = notes;
    if (payload.intensity !== undefined) body.intensity = payload.intensity;

    const record = await apiClient.post<ApiCheckInRecord>(BASE_PATH, body);
    return fromApiRecord(record);
  },
};
