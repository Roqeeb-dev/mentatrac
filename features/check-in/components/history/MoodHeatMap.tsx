"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOOD_META } from "../../hooks/useCheckInHistory";
import { MOOD_STYLES, buildMonthGrid } from "../../lib/historyUtils";
import type { CheckInRecord } from "../../types/checkIn";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface Props {
  month: Date;
  onMonthChange: (next: Date) => void;
  byDay: Map<string, CheckInRecord[]>;
  selectedDay: string | null;
  onSelectDay: (key: string | null) => void;
}

export function MoodHeatmap({
  month,
  onMonthChange,
  byDay,
  selectedDay,
  onSelectDay,
}: Props) {
  const cells = buildMonthGrid(month, byDay);
  const now = new Date();
  const isCurrentMonth =
    month.getFullYear() === now.getFullYear() &&
    month.getMonth() === now.getMonth();

  const shift = (delta: number) =>
    onMonthChange(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">
          {month.toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={isCurrentMonth}
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {WEEKDAYS.map((w, i) => (
          <span
            key={i}
            className="pb-1 text-center text-[10px] font-semibold text-slate-400"
          >
            {w}
          </span>
        ))}

        {cells.map((cell, i) => {
          if (!cell) return <span key={`pad-${i}`} />;

          const mood = cell.latest?.mood;
          const style = mood ? MOOD_STYLES[mood] : null;
          const isSelected = selectedDay === cell.key;
          const label = mood
            ? `${cell.key}: ${MOOD_META[mood].label}`
            : `${cell.key}: no check-in`;

          return (
            <button
              key={cell.key}
              type="button"
              disabled={!mood}
              onClick={() => onSelectDay(isSelected ? null : cell.key)}
              aria-label={label}
              aria-pressed={isSelected}
              title={label}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border text-[10px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4DFB]/50 ${
                style
                  ? "hover:-translate-y-px hover:shadow-sm"
                  : cell.isFuture
                    ? "cursor-default border-transparent text-slate-200"
                    : "cursor-default border-dashed border-slate-200 text-slate-300"
              } ${isSelected ? "ring-2 ring-[#5B4DFB]" : ""}`}
              style={
                style
                  ? { backgroundColor: style.tint, borderColor: style.border }
                  : undefined
              }
            >
              {mood ? (
                <>
                  <span className="text-base leading-none sm:text-lg">
                    {MOOD_META[mood].emoji}
                  </span>
                  <span className="mt-0.5 hidden text-slate-400 sm:block">
                    {cell.day}
                  </span>
                </>
              ) : (
                <span>{cell.day}</span>
              )}
              {cell.count > 1 && (
                <span
                  className="absolute right-0.5 top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-1 text-[8px] font-bold text-white"
                  style={{ backgroundColor: style?.color }}
                >
                  {cell.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
