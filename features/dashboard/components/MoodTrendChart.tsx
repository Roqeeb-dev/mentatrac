"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MoodTrendPoint } from "../types/dashboard";

interface MoodTrendChartProps {
  data: MoodTrendPoint[];
}

// Map score ranges to design-matched node colors
const getNodeColor = (score: number) => {
  if (score >= 4.5) return "#F97316";
  if (score >= 3.5) return "#10B981";
  if (score >= 3.0) return "#3B82F6";
  return "#8B5CF6";
};

// Custom Dot renderer to handle dynamic dot colors
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;

  const color = getNodeColor(payload.score);

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={color}
      stroke="#FFFFFF"
      strokeWidth={1.5}
      className="transition-all hover:r-6"
    />
  );
};

// Custom Minimal Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: MoodTrendPoint = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-md font-medium">
        <p className="text-slate-300">{data.date}</p>
        <p className="font-bold text-violet-300">Score: {data.score}</p>
      </div>
    );
  }
  return null;
};

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">14-day mood trend</h3>
        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
          <span>&darr; Difficult</span>
          <span>&uarr; Radiant</span>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 12, right: 12, left: 12, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
              dy={10}
              interval="preserveStartEnd"
            />
            <YAxis domain={[1, 5]} hide />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={{ r: 6, strokeWidth: 0 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
