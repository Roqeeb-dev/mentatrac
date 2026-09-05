import { CalendarDayMood } from "../types/reports";

interface MoodCalendarProps {
  calendarDays: CalendarDayMood[];
}

export function MoodCalendar({ calendarDays }: MoodCalendarProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-slate-800">30-day mood calendar</h3>

      <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className="flex h-9 w-full items-center justify-center rounded-xl bg-amber-50/60 border border-amber-100 text-base"
            title={`${day.date}: ${day.type}`}
          >
            {day.emoji}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1">✨ Radiant</span>
        <span className="flex items-center gap-1">😊 Good</span>
        <span className="flex items-center gap-1">😐 Okay</span>
        <span className="flex items-center gap-1">😔 Tough</span>
      </div>
    </div>
  );
}
