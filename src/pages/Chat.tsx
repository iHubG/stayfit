/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db, generateAIContent } from "../libs/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Layout from "../components/layout/layout";
import ProfileSummary from "../components/ProfileSummary";
import ChatMessages from "../components/ChatMessages";
import MessageInput from "../components/MessageInput";
import useWelcomeMessage from "../hooks/useWelcomeMessage";
import useWorkoutPrompt from "../hooks/useWorkoutPrompt";
import parseWorkoutFromResponse from "../utils/parseWorkout";
import PulseLoader from "react-spinners/PulseLoader";

export default function Chat() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedWorkoutIds, setSavedWorkoutIds] = useState<string[]>([]);

  const [profile, profileLoading] = useDocument(
    user && doc(db, "users", user.uid)
  );
  const profileData = profile?.data()?.profile;

  const welcomeMessage = useWelcomeMessage(profileData);
  const generatePrompt = useWorkoutPrompt(profileData);

  // Show welcome message once
  useEffect(() => {
    if (profileData && messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          text: welcomeMessage,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length, profileData, welcomeMessage]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        sender: "user",
        timestamp: new Date(),
      },
    ]);
    setIsLoading(true);

    try {
      const aiResponse = await generateAIContent(generatePrompt(text));
      const workoutData = parseWorkoutFromResponse(aiResponse);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: aiResponse,
          sender: "ai",
          timestamp: new Date(),
          workoutData,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "Error fetching AI response. Try again later.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveWorkout = async (message: any) => {
    if (!user) {
      alert("You must be logged in to save workouts.");
      return;
    }
    if (!message?.workoutData?.title || !message?.workoutData?.content) {
      alert("No valid workout to save.");
      return;
    }
    if (savedWorkoutIds.includes(message.id)) {
      alert("This workout has already been saved.");
      return;
    }

    setIsSaving(true);
    try {
      const { title, duration, content, notes, difficulty, equipment } =
        message.workoutData;

      await addDoc(collection(db, "users", user.uid, "workouts"), {
        title,
        duration,
        difficulty: difficulty || "",
        equipment: equipment || "",
        content,
        notes: notes || "",
        createdAt: serverTimestamp(),
        completed: false,
        isFavorite: false,
        source: "ai_chat",
      });

      setSavedWorkoutIds((prev) => [...prev, message.id]);
      // alert("Workout saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save workout.");
    } finally {
      setIsSaving(false);
    }
  };

  if (profileLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader color="#4f46e5" size={12} />
      </div>
    );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <ProfileSummary profileData={profileData} />
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          onSaveWorkout={saveWorkout}
          isSaving={isSaving}
          savedWorkoutIds={savedWorkoutIds}
        />
        <MessageInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </Layout>
  );
}
