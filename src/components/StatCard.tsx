import * as React from "react";
import { Card, CardContent } from "../components/ui/card";

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex flex-col items-center text-center p-4">
        <div className="mb-2">{icon}</div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <p className="text-xs text-gray-600">{label}</p>
      </CardContent>
    </Card>
  );
}

export default StatCard;