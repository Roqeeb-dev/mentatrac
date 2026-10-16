import type { CheckInRecord, MoodScore } from "../types/checkIn";

export const MOOD_STYLES: Record<
  MoodScore,
  { color: string; tint: string; border: string }
> = {
  5: { color: "#F97316", tint: "#FFF4E8", border: "#FFE0BF" },
  4: { color: "#10B981", tint: "#E9F8F1", border: "#C9EEDD" },
  3: { color: "#3B82F6", tint: "#EAF2FE", border: "#CFE0FC" },
  2: { color: "#8B5CF6", tint: "#F1ECFE", border: "#DED3FB" },
  1: { color: "#EF4444", tint: "#FEEDED", border: "#FBD0D0" },
};

export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// `date` is the local calendar day the user logged for, stored at midnight UTC
export const recordDay = (r: CheckInRecord) => r.date.slice(0, 10);

const byNewest = (a: CheckInRecord, b: CheckInRecord) =>
  b.createdAt.localeCompare(a.createdAt);

export function dayLabel(key: string) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (key === dayKey(today)) return "Today";
  if (key === dayKey(yesterday)) return "Yesterday";
  return new Date(`${key}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function groupRecordsByDay(records: CheckInRecord[]) {
  const map = new Map<string, CheckInRecord[]>();
  for (const r of records) {
    const key = recordDay(r);
    map.set(key, [...(map.get(key) ?? []), r]);
  }
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, list]) => ({
      key,
      label: dayLabel(key),
      records: [...list].sort(byNewest),
    }));
}

export function indexByDay(records: CheckInRecord[]) {
  const map = new Map<string, CheckInRecord[]>();
  for (const r of records) {
    const key = recordDay(r);
    map.set(key, [...(map.get(key) ?? []), r]);
  }
  return map;
}

export type MonthCell = {
  key: string;
  day: number;
  latest?: CheckInRecord;
  count: number;
  isFuture: boolean;
} | null;

/** Monday-first grid. Null cells are padding before the 1st. */
export function buildMonthGrid(
  month: Date,
  byDay: Map<string, CheckInRecord[]>,
): MonthCell[] {
  const y = month.getFullYear();
  const m = month.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const total = new Date(y, m + 1, 0).getDate();
  const todayKey = dayKey(new Date());

  const cells: MonthCell[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= total; d++) {
    const key = dayKey(new Date(y, m, d));
    const list = byDay.get(key);
    cells.push({
      key,
      day: d,
      latest: list ? [...list].sort(byNewest)[0] : undefined,
      count: list?.length ?? 0,
      isFuture: key > todayKey,
    });
  }
  return cells;
}
