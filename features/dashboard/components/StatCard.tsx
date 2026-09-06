"use client";

import { Skeleton } from "@/components/ui/Skeleton";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  value: number | string;
  valueColor: string;
  label: string;
  isLoading?: boolean;
}

export function StatCard({
  icon,
  iconBg,
  iconColor,
  value,
  valueColor,
  label,
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-5 w-10 rounded-md" />
          <Skeleton className="h-3 w-20 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs hover:border-slate-200 transition-all">
      <div
        className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <h4 className={`text-xl font-extrabold ${valueColor} leading-none`}>
          {value}
        </h4>
        <p className="text-xs font-medium text-slate-400 mt-1">{label}</p>
      </div>
    </div>
  );
}
