"use client";

import Link from "next/link";
import { AlertCircle, RefreshCw, BookOpen, Plus } from "lucide-react";
import { JournalEntry } from "@/features/journal/types/journal";
import { Skeleton } from "@/components/ui/Skeleton";

interface RecentJournalWidgetProps {
  entries?: JournalEntry[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onNewEntry?: () => void;
}

export function RecentJournalWidget({
  entries = [],
  isLoading = false,
  isError = false,
  onRetry,
  onNewEntry,
}: RecentJournalWidgetProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold text-slate-900">Recent journal</h3>
        <Link
          href="/dashboard/journal"
          className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
        >
          View all &rarr;
        </Link>
      </div>

      {/* Loading Skeleton State using reusable Skeleton */}
      {isLoading && (
        <div className="space-y-2.5">
          {[1, 2, 3].map((key) => (
            <div
              key={key}
              className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-2xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-1/2 rounded-md" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-3/4 rounded-md" />
              </div>
              <Skeleton className="h-2.5 w-12 rounded-md" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4 text-center space-y-2">
          <div className="flex justify-center text-rose-500">
            <AlertCircle className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-800">
            Unable to load journal entries
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-rose-200 rounded-full text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Try again</span>
            </button>
          )}
        </div>
      )}

      {/* Empty State with App Brand Theme */}
      {!isLoading && !isError && entries.length === 0 && (
        <div className="bg-gradient-to-b from-violet-50/50 to-indigo-50/30 border border-violet-100/80 rounded-2xl p-5 text-center space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-violet-100/80 text-violet-600 flex items-center justify-center mx-auto shadow-2xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900">
              No journal entries yet
            </h4>
            <p className="text-[11px] text-slate-500 max-w-[200px] mx-auto leading-relaxed">
              Record your thoughts and reflect on your daily mood.
            </p>
          </div>
          {onNewEntry ? (
            <button
              type="button"
              onClick={onNewEntry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-xs font-semibold transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write first entry</span>
            </button>
          ) : (
            <Link
              href="/dashboard/journal"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-xs font-semibold transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write first entry</span>
            </Link>
          )}
        </div>
      )}

      {/* Populated State */}
      {!isLoading && !isError && entries.length > 0 && (
        <div className="space-y-2.5">
          {entries.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-2xs hover:border-slate-200 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-slate-900">
                  {entry.title}
                </h4>
                <span className="text-xs">{entry.emoji || "😊"}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2">
                {entry.content}
              </p>
              <span className="text-[10px] font-medium text-slate-400">
                {new Date(entry.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                }) ===
                new Date().toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
                  ? "Today"
                  : "Yesterday"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
