import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Calendar } from "lucide-react";

interface Props {
  progress: number;
  completedCount: number;
  remainingCount: number;
}

export default function WeeklyProgressCard({ progress, completedCount, remainingCount }: Props) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Calendar className="w-4 h-4 text-blue-500" />
          This Week's Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Workouts completed this week</span>
            <span className="font-semibold">{completedCount}/4</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500">
            {progress >= 100
              ? "🎉 Goal complete!"
              : `${remainingCount} more to reach your goal`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
