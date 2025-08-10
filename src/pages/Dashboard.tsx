import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../libs/firebase";
import { doc } from "firebase/firestore";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dumbbell, LogOut, User, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Fetch user profile from Firestore
  const [profile, loading, error] = useDocument(
    user ? doc(db, "users", user.uid) : null
  );

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  if (!user) return null; // Redirect logic handled by PrivateRoute

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">StayFit</span>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </header>

        {/* Welcome Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back{profile?.data()?.name ? `, ${profile.data().profile.name}` : ""}!
        </h1>
        <p className="text-gray-600 mb-8">
          {profile?.data()?.profile.primaryGoal
            ? `Your goal: ${profile.data().profile.primaryGoal}`
            : "Set your profile to get personalized workouts."}
        </p>

        {/* Quick Actions */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100"
            onClick={() => navigate("/workouts")}
          >
            <CardContent className="flex flex-col items-center text-center p-6">
              <List className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg text-gray-800">
                Workout Plans
              </h3>
              <p className="text-gray-600 text-sm">
                View and start your personalized workout plans.
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100"
            onClick={() => navigate("/profile")}
          >
            <CardContent className="flex flex-col items-center text-center p-6">
              <User className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-lg text-gray-800">
                Profile
              </h3>
              <p className="text-gray-600 text-sm">
                Update your profile information and goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
