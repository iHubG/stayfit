import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-0 shadow-lg p-4 bg-white rounded-lg">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask for a workout, form tips, or fitness advice..."
          className="flex-1"
          disabled={disabled}
        />
        <Button onClick={handleSend} disabled={disabled || !text.trim()} size="sm">
          {disabled ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {[
          "Give me a quick 15-minute workout",
          "Upper body strength training",
          "Cardio for beginners",
          "Core strengthening exercises"
        ].map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setText(suggestion)}
            disabled={disabled}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
