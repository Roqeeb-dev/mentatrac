import { Skeleton } from "@/components/ui/Skeleton";

export function ReportsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8 animate-pulse space-y-8">
      {/* Page Header & Time Range Tabs Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-32 rounded-md" />
          <Skeleton className="mt-2 h-4 w-48 rounded-md" />
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 p-1.5 self-start sm:self-auto">
          <Skeleton className="h-7 w-12 rounded-full" />
          <Skeleton className="h-7 w-12 rounded-full" />
          <Skeleton className="h-7 w-12 rounded-full" />
        </div>
      </div>

      {/* Row 1: Key Metrics (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs h-28"
          >
            <Skeleton className="h-3 w-24 rounded-md uppercase tracking-wider" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-4 w-12 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Large Mood Trend Line Chart */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28 rounded-md" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-16 rounded-md" />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        </div>
        {/* Chart Line Placeholder */}
        <div className="h-52 w-full flex items-end gap-3 pt-6">
          {[40, 65, 45, 80, 50, 75, 40, 68, 70, 52, 78, 60, 48, 64, 72].map(
            (height, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <Skeleton
                  className="w-full rounded-t-sm"
                  style={{ height: `${height}%` }}
                />
                <Skeleton className="h-3 w-6 rounded-md" />
              </div>
            ),
          )}
        </div>
      </div>

      {/* Row 3: 3-Column Analytics Grid (Donut, Tags, Horizontal Bars) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Distribution (Donut Chart Skeleton) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between min-h-[280px]">
          <Skeleton className="h-5 w-36 rounded-md" />
          <div className="flex items-center justify-center py-4">
            <Skeleton className="h-32 w-32 rounded-full border-8 border-slate-100" />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="h-3 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Most Felt Emotions (Tag Pills Skeleton) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between min-h-[280px]">
          <Skeleton className="h-5 w-36 rounded-md" />
          <div className="flex flex-wrap gap-2.5 my-auto py-4">
            {[
              "w-20",
              "w-16",
              "w-24",
              "w-18",
              "w-22",
              "w-16",
              "w-20",
              "w-28",
              "w-18",
            ].map((width, i) => (
              <Skeleton key={i} className={`h-8 ${width} rounded-xl`} />
            ))}
          </div>
        </div>

        {/* Top Triggers (Horizontal Bars Skeleton) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between min-h-[280px]">
          <Skeleton className="h-5 w-28 rounded-md" />
          <div className="space-y-4 my-auto py-2">
            {[
              { label: "w-16", bar: "w-full" },
              { label: "w-12", bar: "w-3/4" },
              { label: "w-14", bar: "w-1/2" },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className={`h-3 ${item.label} rounded-md`} />
                <Skeleton className={`h-4 ${item.bar} rounded-lg`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: 30-Day Mood Calendar Grid */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
        <Skeleton className="h-5 w-44 rounded-md" />
        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-2xl" />
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-3 w-16 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
