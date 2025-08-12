import * as React from "react";
import { Card, CardContent } from "../components/ui/card";

function ActionCard({
  icon,
  title,
  desc,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer border-0 shadow-sm hover:shadow-md hover:scale-[1.02] transition bg-gray-50 hover:bg-white"
    >
      <CardContent className="flex flex-col items-center text-center p-6">
        <div className="mb-3">{icon}</div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

export default ActionCard