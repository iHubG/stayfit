import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, MapPin, Clock } from "lucide-react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileData: any;
}

export default function ProfileSummary({ profileData }: Props) {
  if (!profileData) return null;

  return (
    <Card className="mb-6 border-0 shadow-md">
      <CardContent className="p-4 flex flex-wrap gap-4 text-sm">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Target className="w-3 h-3" />
          {profileData.primaryGoal?.replace("_", " ") || "General fitness"}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {profileData.preferredLocation || "Any location"}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {profileData.availableTime || "Flexible time"}
        </Badge>
        <Badge variant="secondary">
          {profileData.fitnessLevel || "Beginner"} level
        </Badge>
      </CardContent>
    </Card>
  );
}
