"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { Wind } from "lucide-react";

export interface QuickExerciseData {
  category: string;
  duration: string;
  title: string;
  subtitle: string;
}

interface QuickExerciseCardProps {
  exercise: QuickExerciseData;
  isLoading?: boolean;
}

export function QuickExerciseCard({
  exercise,
  isLoading = false,
}: QuickExerciseCardProps) {
  if (isLoading) {
    return (
      <div className="bg-[#F3F0FF] border border-violet-100/60 rounded-2xl p-4 flex items-start gap-3.5">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-3 w-full rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F0FF] border border-violet-100/60 rounded-2xl p-4 flex items-start gap-3.5">
      <div className="w-10 h-10 rounded-xl bg-[#5B4DFB] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
        <Wind className="w-5 h-5 stroke-[2.2]" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-[#5B4DFB] tracking-wider uppercase">
            {exercise.category}
          </span>
          <span className="text-[10px] font-semibold bg-[#E4DCFF] text-[#5B4DFB] px-2 py-0.5 rounded-full">
            {exercise.duration}
          </span>
        </div>
        <h4 className="text-xs font-bold text-slate-900 leading-snug">
          {exercise.title}
        </h4>
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
          {exercise.subtitle}
        </p>
      </div>
    </div>
  );
}
