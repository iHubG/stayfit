import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dumbbell, User, Calendar, Loader2 } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../libs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("beginner");
  const [primaryGoal, setPrimaryGoal] = useState("get_fit");
  const [preferredLocation, setPreferredLocation] = useState("home");
  const [availableTime, setAvailableTime] = useState("30min");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          profile: {
            name,
            email: user.email || "",
            age: parseInt(age, 10),
            fitnessLevel,
            primaryGoal,
            preferredLocation,
            availableTime,
            createdAt: serverTimestamp(),
          },
        },
        { merge: true }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">StayFit</span>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Set up your profile
            </CardTitle>
            <p className="text-gray-600 mt-1">
              Tell us a bit about yourself to get personalized workout plans.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400 mt-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age">Age</Label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400 mt-3"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              {/* Fitness Level */}
              <div>
                <Label>Fitness Level</Label>
                <select
                  className="w-full border-gray-200 rounded-md p-2 mt-3 focus:border-blue-400 focus:ring-blue-400"
                  value={fitnessLevel}
                  onChange={(e) => setFitnessLevel(e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Primary Goal */}
              <div>
                <Label>Primary Goal</Label>
                <select
                  className="w-full border-gray-200 rounded-md p-2 mt-3 focus:border-blue-400 focus:ring-blue-400"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                >
                  <option value="lose_weight">Lose Weight</option>
                  <option value="build_muscle">Build Muscle</option>
                  <option value="get_fit">Get Fit</option>
                  <option value="maintain_health">Maintain Health</option>
                </select>
              </div>

              {/* Preferred Location */}
              <div>
                <Label>Preferred Workout Location</Label>
                <select
                  className="w-full border-gray-200 rounded-md p-2 mt-3 focus:border-blue-400 focus:ring-blue-400"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                >
                  <option value="home">Home</option>
                  <option value="gym">Gym</option>
                </select>
              </div>

              {/* Available Time */}
              <div>
                <Label>Available Time Per Session</Label>
                <select
                  className="w-full border-gray-200 rounded-md p-2 mt-3 focus:border-blue-400 focus:ring-blue-400"
                  value={availableTime}
                  onChange={(e) => setAvailableTime(e.target.value)}
                >
                  <option value="15min">15 minutes</option>
                  <option value="30min">30 minutes</option>
                  <option value="45min">45 minutes</option>
                  <option value="60min+">60 minutes+</option>
                </select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            </form>

            {/* Skip Option
            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              >
                Skip for now
              </Button>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
