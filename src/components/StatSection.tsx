import { Flame, CheckCircle, Target, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";

interface Props {
  currentStreak: number;
  totalWorkouts: number;
  weekProgress: number;
  bestStreak: number;
}

export default function StatSection({ currentStreak, totalWorkouts, weekProgress, bestStreak }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={<Flame className="text-orange-500" />} label="Day Streak" value={currentStreak} />
      <StatCard icon={<CheckCircle className="text-green-500" />} label="Total Workouts" value={totalWorkouts} />
      <StatCard icon={<Target className="text-blue-500" />} label="Week Goal" value={`${Math.round(weekProgress)}%`} />
      <StatCard icon={<TrendingUp className="text-purple-500" />} label="Best Streak" value={bestStreak} />
    </section>
  );
}
