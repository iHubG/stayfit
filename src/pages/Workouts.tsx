/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../libs/firebase";
import Layout from "../components/layout/layout";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, Star, ArrowLeft, Trash } from "lucide-react";
import PulseLoader from "react-spinners/PulseLoader";

export default function Workout() {
  const [user] = useAuthState(auth);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);

  const location = useLocation();
  const selectedIdFromState = location.state?.selectedId;

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "workouts")
      );
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWorkouts(data);
      setLoading(false);
    };
    fetchWorkouts();
  }, [user]);

  useEffect(() => {
    if (selectedIdFromState && workouts.length) {
      const found = workouts.find((w) => w.id === selectedIdFromState);
      if (found) {
        setSelectedWorkout(found);
      }
    }
  }, [selectedIdFromState, workouts]);

  const markCompleted = async (id: string) => {
    if (!user) return;
    const now = new Date();

    // 1. Mark workout completed
    await updateDoc(doc(db, "users", user.uid, "workouts", id), {
      completed: true,
      completedAt: now,
    });

    setWorkouts((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, completed: true, completedAt: now } : w
      )
    );

    setSelectedWorkout((prev: { id: string }) =>
      prev && prev.id === id
        ? { ...prev, completed: true, completedAt: now }
        : prev
    );

    // 2. Get the main user doc (with profile + stats fields)
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // First time — create doc with stats field
      await setDoc(
        userRef,
        {
          stats: {
            totalWorkouts: 1,
            currentStreak: 1,
            longestStreak: 1,
            lastWorkoutDate: now,
          },
        },
        { merge: true }
      );
      return;
    }

    // 3. Update existing stats
    const userData = userSnap.data() || {};
    const statsData = userData.stats || {};

    const today = new Date(now.toDateString());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let newCurrentStreak = statsData.currentStreak || 0;
    const totalWorkouts = (statsData.totalWorkouts || 0) + 1;

    if (statsData.lastWorkoutDate?.toDate) {
      const lastDate = new Date(statsData.lastWorkoutDate.toDate());

      if (lastDate.toDateString() === today.toDateString()) {
        // Same day — keep streak
        newCurrentStreak = statsData.currentStreak || 1;
      } else if (lastDate.toDateString() === yesterday.toDateString()) {
        // Yesterday — increment streak
        newCurrentStreak += 1;
      } else {
        // Gap — reset streak
        newCurrentStreak = 1;
      }
    } else {
      newCurrentStreak = 1;
    }

    const newLongestStreak = Math.max(
      statsData.longestStreak || 0,
      newCurrentStreak
    );

    await updateDoc(userRef, {
      stats: {
        totalWorkouts,
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastWorkoutDate: now,
      },
    });
  };

  const toggleFavorite = async (id: string, currentValue: boolean) => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid, "workouts", id), {
      isFavorite: !currentValue,
    });
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isFavorite: !currentValue } : w))
    );

    setSelectedWorkout((prev: { id: string }) =>
      prev && prev.id === id ? { ...prev, isFavorite: !currentValue } : prev
    );
  };

  const deleteWorkout = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this workout?"))
      return;
    await deleteDoc(doc(db, "users", user.uid, "workouts", id));
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
    setSelectedWorkout(null);
  };

  if (loading)
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <PulseLoader color="#4f46e5" size={12} />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-2 md:p-4">
        <h2 className="text-2xl font-bold mb-6">Workouts</h2>

        {/* Workout List View */}
        {!selectedWorkout && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Card
                key={workout.id}
                className="hover:shadow-lg transition cursor-pointer flex-col justify-between"
                onClick={() => setSelectedWorkout(workout)}
              >
                <CardHeader className="flex flex-row justify-between items-start">
                  <CardTitle className="text-lg font-semibold">
                    <ReactMarkdown>
                      {(workout.title || "").replace(/\*\*/g, "")}
                    </ReactMarkdown>
                  </CardTitle>
                  {workout.isFavorite && (
                    <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    <ReactMarkdown>
                      {workout.duration.replace(/\*\*/g, "")}
                    </ReactMarkdown>
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    {workout.createdAt?.toDate
                      ? new Date(
                          workout.createdAt.toDate()
                        ).toLocaleDateString()
                      : ""}
                  </p>
                  {workout.completed && (
                    <span className="text-green-600 text-xs font-medium bg-green-200 p-1 rounded-lg px-3">
                      Completed ✓ 
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Workout Detail View */}
        {selectedWorkout && (
          <div>
            {/* Back button above card for better positioning */}
            <div className="mb-4 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedWorkout(null)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Workouts
              </Button>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="px-10">
                <CardTitle className="text-xl font-semibold">
                  <ReactMarkdown>
                    {(selectedWorkout.title || "").replace(/\*\*/g, "")}
                  </ReactMarkdown>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  <ReactMarkdown>
                    {selectedWorkout.duration.replace(/\*\*/g, "")}
                  </ReactMarkdown>
                </p>
              </CardHeader>

              <CardContent>
                {/* Added spacing and formatting to workout text */}
                <div className="bg-gray-50 p-4 rounded text-sm leading-relaxed prose prose-sm max-w-none">
                  <ReactMarkdown>
                    {selectedWorkout.content.replace(
                      /^(?!\*\*)(.+?)\*\*/,
                      (_: any, text: string) => `**${text.trim()}**`
                    )}
                  </ReactMarkdown>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button
                    onClick={() => markCompleted(selectedWorkout.id)}
                    disabled={selectedWorkout.completed}
                    className={
                      selectedWorkout.completed
                        ? "bg-green-500 hover:bg-green-500"
                        : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    }
                  >
                    <Check className="w-4 h-4" />
                    {selectedWorkout.completed
                      ? "Completed"
                      : "Mark as Completed"}
                  </Button>

                  <Button
                    onClick={() =>
                      toggleFavorite(
                        selectedWorkout.id,
                        selectedWorkout.isFavorite
                      )
                    }
                    variant={
                      selectedWorkout.isFavorite ? "default" : "secondary"
                    }
                    className={
                      selectedWorkout.isFavorite
                        ? "bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    <Star
                      className={`w-4 h-4 ${
                        selectedWorkout.isFavorite
                          ? "fill-white text-white"
                          : ""
                      }`}
                    />
                    {selectedWorkout.isFavorite
                      ? "Favorite"
                      : "Add to Favorites"}
                  </Button>

                  {/* Delete Button */}
                  <Button
                    onClick={() => deleteWorkout(selectedWorkout.id)}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    <Trash className="w-4 h-4" /> Delete
                  </Button>
                </div>

                {selectedWorkout.notes && (
                  <div className="mt-4 text-sm text-gray-700">
                    <strong>Notes:</strong> {selectedWorkout.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
