/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  workouts: any[];
  onViewAll: () => void;
}

export default function RecentActivityCard({ workouts, onViewAll }: Props) {
  const navigate = useNavigate();

  if (!workouts.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm text-gray-800">
          <Clock className="w-4 h-4 text-gray-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {workouts.slice(0, 3).map((workout) => {
            const data = workout.data();
            const date = data.createdAt?.toDate();
            const isCompleted = data.completed;

            return (
              <div
                key={workout.id}
                className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => navigate('/workouts', { state: { selectedId: workout.id } })}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-gray-400"}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{(data.title || "Workout").replace(/\*\*/g, "")}</p>
                    <p className="text-xs text-gray-500">{date ? date.toLocaleDateString() : "Recent"}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{(data.duration || "").replace(/\*\*/g, "")}</div>
              </div>
            );
          })}
        </div>

        {workouts.length > 3 && (
          <Button variant="ghost" className="w-full mt-4" onClick={onViewAll}>
            View All Workouts
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
