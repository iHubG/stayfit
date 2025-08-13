/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Save, Loader2, Check, Dumbbell } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface Props {
  messages: any[];
  isLoading: boolean;
  onSaveWorkout: (message: any) => void;
  isSaving: boolean;
  savedWorkoutIds?: string[];
}

export default function ChatMessages({
  messages,
  isLoading,
  onSaveWorkout,
  isSaving,
  savedWorkoutIds = [],
}: Props) {
  return (
    <Card className="mb-4 border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Dumbbell color="#4f46e5" className="w-5 h-5" />
          Workout Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isAi = message.sender === "ai";
              const alreadySaved = savedWorkoutIds.includes(message.id);
              const validWorkout =
                message.workoutData &&
                message.workoutData.title &&
                message.workoutData.content;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    isAi ? "justify-start" : "justify-end"
                  }`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Dumbbell className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      isAi
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-500 text-white ml-auto"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>

                    {isAi && validWorkout && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Button
                          size="sm"
                          variant={alreadySaved ? "secondary" : "outline"}
                          onClick={() => {
                            if (!alreadySaved) {
                              onSaveWorkout(message); // Pass full message
                            }
                          }}
                          disabled={isSaving || alreadySaved}
                          className="text-xs cursor-pointer"
                        >
                          {isSaving && !alreadySaved ? (
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                          ) : alreadySaved ? (
                            <Check className="w-3 h-3 mr-1 text-green-600" />
                          ) : (
                            <Save className="w-3 h-3 mr-1" />
                          )}
                          {alreadySaved ? "Saved" : "Save Workout"}
                        </Button>
                      </div>
                    )}

                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
