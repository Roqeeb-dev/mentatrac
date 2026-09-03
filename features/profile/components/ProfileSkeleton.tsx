import { Skeleton } from "@/components/ui/Skeleton";

export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8 animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
        {/* Left Column Skeleton Container */}
        <aside className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm gap-5">
          {/* User Bio Block */}
          <div className="flex flex-col items-center text-center pt-2 pb-1">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="mt-4 h-6 w-32 rounded-md" />
            <Skeleton className="mt-2 h-3.5 w-44 rounded-md" />
            <Skeleton className="mt-2 h-3 w-28 rounded-md" />
          </div>

          {/* Wellness Score Card (Purple Gradient Accent) */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-indigo-600/15 p-5 border border-indigo-500/10">
            <Skeleton className="h-3 w-24 rounded-md bg-indigo-500/20" />
            <div className="mt-3 flex items-baseline gap-2">
              <Skeleton className="h-9 w-12 rounded-lg bg-indigo-500/20" />
              <Skeleton className="h-4 w-8 rounded-md bg-indigo-500/20" />
            </div>
            <Skeleton className="mt-4 h-2 w-full rounded-full bg-indigo-500/20" />
            <Skeleton className="mt-3 h-3 w-4/5 rounded-md bg-indigo-500/20" />
          </div>

          {/* Mini Stats 3-Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-center"
              >
                <Skeleton className="h-5 w-6 rounded-md" />
                <Skeleton className="mt-1.5 h-3 w-10 rounded-md" />
              </div>
            ))}
          </div>

          {/* Mood Breakdown */}
          <div className="pt-1">
            <Skeleton className="h-4 w-28 rounded-md" />
            <div className="mt-4 space-y-3.5">
              {[
                { emoji: "w-4", bar: "w-1/3" },
                { emoji: "w-4", bar: "w-full" },
                { emoji: "w-4", bar: "w-1/2" },
                { emoji: "w-4", bar: "w-1/4" },
                { emoji: "w-4", bar: "w-0" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <Skeleton className={`h-full ${item.bar} rounded-full`} />
                  </div>
                  <Skeleton className="h-3 w-4 rounded-md shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column Settings Skeleton Container */}
        <main className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm divide-y divide-slate-100">
          {/* Section 1: Notifications */}
          <div className="pb-6">
            <Skeleton className="h-3.5 w-24 rounded-md uppercase tracking-wider" />
            <div className="mt-5 space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-36 rounded-md" />
                    <Skeleton className="h-3 w-52 rounded-md" />
                  </div>
                  <Skeleton className="h-6 w-11 rounded-full shrink-0" />
                </div>
              ))}
              {/* Select Time row */}
              <div className="flex items-center justify-between pt-1">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
                <Skeleton className="h-4 w-4 rounded-md shrink-0" />
              </div>
            </div>
          </div>

          {/* Section 2: Privacy & Security */}
          <div className="py-6">
            <Skeleton className="h-3.5 w-32 rounded-md uppercase tracking-wider" />
            <div className="mt-5 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-3 w-40 rounded-md" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full shrink-0" />
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-4 w-4 rounded-md shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Data & Storage */}
          <div className="py-6">
            <Skeleton className="h-3.5 w-28 rounded-md uppercase tracking-wider" />
            <div className="mt-5 space-y-5">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-44 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-4 rounded-md shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Account Actions */}
          <div className="pt-6">
            <Skeleton className="h-3.5 w-20 rounded-md uppercase tracking-wider" />
            <div className="mt-5 space-y-4">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-28 rounded-md" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
