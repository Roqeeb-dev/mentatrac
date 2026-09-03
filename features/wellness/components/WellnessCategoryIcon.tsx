import {
  Wind,
  Footprints,
  Moon,
  PenTool,
  Droplet,
  Sparkles,
} from "lucide-react";
import { WellnessCategory } from "../types/wellness";

interface Props {
  category: Exclude<WellnessCategory, "All">;
  className?: string;
}

export function WellnessCategoryIcon({
  category,
  className = "h-4 w-4",
}: Props) {
  switch (category) {
    case "Breathing":
      return <Wind className={`${className} text-indigo-400`} />;
    case "Movement":
      return <Footprints className={`${className} text-emerald-500`} />;
    case "Sleep":
      return <Moon className={`${className} text-purple-400`} />;
    case "Reflection":
      return <PenTool className={`${className} text-amber-500`} />;
    case "Hydration":
      return <Droplet className={`${className} text-sky-400`} />;
    case "Affirmation":
      return <Sparkles className={`${className} text-[#5B46F6]`} />;
    default:
      return null;
  }
}
