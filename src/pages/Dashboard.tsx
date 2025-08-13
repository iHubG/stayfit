/* eslint-disable react-hooks/rules-of-hooks */
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../libs/firebase";
import { doc, collection, query, orderBy, limit } from "firebase/firestore";
import PulseLoader from "react-spinners/PulseLoader";

// Components
import Layout from "../components/layout/layout";
import WelcomeSection from "../components/WelcomeSection";
import StatSection from "../components/StatSection";
import WeeklyProgressCard from "../components/WeeklyProgressCard";
import RecentActivityCard from "../components/RecentActivityCard";

// Hooks
import useGreeting from "../hooks/useGreeting";
import useMotivationalMessage from "../hooks/useMotivationalMessage";
import useWeeklyProgress from "../hooks/useWeeklyProgress";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Load the whole user doc
  const [userDoc, userDocLoading] = useDocument(
    user && doc(db, "users", user.uid)
  );

  // Load recent workouts
  const [workouts] = useCollection(
    user &&
      query(
        collection(db, "users", user.uid, "workouts"),
        orderBy("createdAt", "desc"),
        limit(5)
      )
  );

  if (!user) return null;

  // Proper loading state
  if (userDocLoading) {
    return (
       <div className="flex items-center justify-center min-h-screen">
          <PulseLoader color="#4f46e5" size={12} />
        </div>
    );
  }

  const userData = userDoc?.data() || {};
  const profileData = userData.profile || {};
  const statsData = userData.stats || {};
  const recentWorkouts = workouts?.docs || [];

  const currentStreak = statsData.currentStreak || 0;
  const greeting = useGreeting();
  const motivationalMessage = useMotivationalMessage(currentStreak);
  const { progress, completedCount, remainingCount } = useWeeklyProgress(
    recentWorkouts
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <WelcomeSection
          greeting={greeting}
          name={profileData.name}
          message={motivationalMessage}
        />

        <StatSection
          currentStreak={currentStreak}
          totalWorkouts={statsData.totalWorkouts || 0}
          weekProgress={progress}
          bestStreak={statsData.longestStreak || 0}
        />

        <WeeklyProgressCard
          progress={progress}
          completedCount={completedCount}
          remainingCount={remainingCount}
        />

        <RecentActivityCard
          workouts={recentWorkouts}
          onViewAll={() => navigate("/workouts")}
        />
      </div>
    </Layout>
  );
}
