"use client";

import { useMemo, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { useCheckIns, MOOD_META } from "../../hooks/useCheckInHistory";
import {
  MOOD_STYLES,
  dayLabel,
  groupRecordsByDay,
  indexByDay,
  recordDay,
} from "../../lib/historyUtils";
import type { MoodScore } from "../../types/checkIn";
import { useCheckInModalStore } from "@/stores/check-in-modal-store";
import { MoodHeatmap } from "./MoodHeatMap";
import { CheckInTimeline } from "./CheckinTimeline";

const PAGE_SIZE = 20;
const MOODS: MoodScore[] = [5, 4, 3, 2, 1];

const firstOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

export function CheckInHistory() {
  const { data: records = [], isLoading, isError, refetch } = useCheckIns();
  const openCheckIn = useCheckInModalStore((s) => s.open);

  const [month, setMonth] = useState(() => firstOfMonth(new Date()));
  const [moodFilter, setMoodFilter] = useState<MoodScore | "all">("all");
  const [emotionFilter, setEmotionFilter] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const byDay = useMemo(() => indexByDay(records), [records]);

  const topEmotions = useMemo(() => {
    const counts = new Map<string, number>();
    records.forEach((r) =>
      r.emotions.forEach((e) => counts.set(e, (counts.get(e) ?? 0) + 1)),
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name]) => name);
  }, [records]);

  const monthStats = useMemo(() => {
    const prefix = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
    const inMonth = records.filter((r) => recordDay(r).startsWith(prefix));
    const days = new Set(inMonth.map(recordDay)).size;
    const avg = inMonth.length
      ? inMonth.reduce((s, r) => s + r.mood, 0) / inMonth.length
      : 0;
    const avgMood = avg
      ? (Math.min(5, Math.max(1, Math.round(avg))) as MoodScore)
      : null;
    return { count: inMonth.length, days, avgMood };
  }, [records, month]);

  const filtered = useMemo(
    () =>
      records.filter(
        (r) =>
          (moodFilter === "all" || r.mood === moodFilter) &&
          (!emotionFilter || r.emotions.includes(emotionFilter as never)) &&
          (!selectedDay || recordDay(r) === selectedDay),
      ),
    [records, moodFilter, emotionFilter, selectedDay],
  );

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [filtered],
  );
  const groups = useMemo(
    () => groupRecordsByDay(sorted.slice(0, visible)),
    [sorted, visible],
  );

  const hasFilters = moodFilter !== "all" || !!emotionFilter || !!selectedDay;
  const resetPaging = () => setVisible(PAGE_SIZE);
  const clearFilters = () => {
    setMoodFilter("all");
    setEmotionFilter(null);
    setSelectedDay(null);
    resetPaging();
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-[820px] max-w-full space-y-4">
        <div className="h-72 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-[820px] max-w-full rounded-3xl border border-rose-100 bg-rose-50/60 p-8 text-center">
        <p className="text-sm font-semibold text-slate-800">
          We couldn&apos;t load your check-ins.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-[#5B4DFB] px-4 py-2 text-xs font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="mx-auto flex w-[820px] max-w-full flex-col items-center gap-3 rounded-3xl border border-slate-200/80 bg-white p-10 text-center shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-400">
          <CalendarDays className="h-6 w-6" />
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Your history starts here
        </h2>
        <p className="w-[300px] max-w-full text-sm leading-relaxed text-slate-500">
          Every check-in you log shows up on this timeline, so you can look back
          at how your days felt.
        </p>
        <button
          type="button"
          onClick={openCheckIn}
          className="mt-2 rounded-xl bg-[#5B4DFB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-colors hover:bg-[#4A3CE2]"
        >
          Log your first check-in
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[820px] max-w-full space-y-6">
      <MoodHeatmap
        month={month}
        onMonthChange={setMonth}
        byDay={byDay}
        selectedDay={selectedDay}
        onSelectDay={(key) => {
          setSelectedDay(key);
          resetPaging();
        }}
      />

      {/* Month summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Check-ins", value: monthStats.count },
          { label: "Days logged", value: monthStats.days },
          {
            label: "Avg mood",
            value: monthStats.avgMood
              ? MOOD_META[monthStats.avgMood].emoji
              : "–",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-center shadow-sm"
          >
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
            <p className="text-[11px] font-medium text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <button
            type="button"
            onClick={() => {
              setMoodFilter("all");
              resetPaging();
            }}
            aria-pressed={moodFilter === "all"}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              moodFilter === "all"
                ? "border-[#5B4DFB] bg-[#5B4DFB] text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            All
          </button>
          {MOODS.map((m) => {
            const active = moodFilter === m;
            const style = MOOD_STYLES[m];
            return (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMoodFilter(active ? "all" : m);
                  resetPaging();
                }}
                aria-pressed={active}
                className="shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors"
                style={
                  active
                    ? {
                        backgroundColor: style.color,
                        borderColor: style.color,
                        color: "#fff",
                      }
                    : {
                        backgroundColor: "#fff",
                        borderColor: style.border,
                        color: style.color,
                      }
                }
              >
                {MOOD_META[m].emoji} {MOOD_META[m].label}
              </button>
            );
          })}
        </div>

        {topEmotions.length > 0 && (
          <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Felt
            </span>
            {topEmotions.map((e) => {
              const active = emotionFilter === e;
              return (
                <button
                  key={e}
                  type="button"
                  onClick={() => {
                    setEmotionFilter(active ? null : e);
                    resetPaging();
                  }}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-slate-800 bg-slate-800 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {e}
                </button>
              );
            })}
          </div>
        )}

        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>
              {sorted.length} {sorted.length === 1 ? "result" : "results"}
              {selectedDay ? ` for ${dayLabel(selectedDay)}` : ""}
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600 hover:bg-slate-200"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Timeline */}
      {sorted.length === 0 ? (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">
            No check-ins match those filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-xs font-semibold text-[#5B4DFB] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <CheckInTimeline groups={groups} />
          {sorted.length > visible && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
