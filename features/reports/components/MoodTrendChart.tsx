"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";
import { MoodTrendPoint } from "../types/reports";

interface MoodTrendChartProps {
  data: MoodTrendPoint[];
}

// Map score ranges to design palette colors
const getMoodColor = (score: number) => {
  if (score >= 4.0) return "#FB923C";
  if (score >= 3.0) return "#34D399";
  if (score >= 2.0) return "#60A5FA";
  return "#A78BFA";
};

// Custom Active/Standard Dot Renderer
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;

  const color = getMoodColor(payload.score);

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={color}
      stroke="#FFFFFF"
      strokeWidth={1.5}
      className="transition-all duration-200 hover:r-6 cursor-pointer"
    />
  );
};

// Custom Tooltip for hovering over data points
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: MoodTrendPoint = payload[0].payload;
    const color = getMoodColor(data.score);

    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 p-2.5 shadow-lg backdrop-blur-md">
        <p className="text-[11px] font-semibold text-slate-400">{data.date}</p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-bold text-slate-800">
            Score: {data.score}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      {/* Chart Header */}
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-base font-bold tracking-tight text-slate-900">
          Mood trend
        </h3>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span className="inline-flex items-center gap-1">
            <ArrowDown className="h-3 w-3 text-slate-400" /> Difficult
          </span>
          <span className="inline-flex items-center gap-1">
            <ArrowUp className="h-3 w-3 text-slate-400" /> Radiant
          </span>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 12, right: 12, left: 12, bottom: 0 }}
          >
            {/* Multi-color line gradient */}
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              dy={10}
              interval="preserveStartEnd"
            />
            <YAxis domain={[1, 5]} hide />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="score"
              stroke="url(#moodGradient)"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#FFFFFF" }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
