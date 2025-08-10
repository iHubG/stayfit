// components/DatabaseTest.tsx
import { useState } from 'react';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../libs/firebase';

export function DatabaseTest() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Test 1: Read the user document you created
  const testReadUser = async () => {
    try {
      setLoading(true);
      addResult("🔍 Testing read user...");
      
      const userRef = doc(db, 'users', 'pZlSRSyUdbHUFsDqNL5g');
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        addResult("✅ User data found!");
        addResult(`📊 Profile name: ${userData.profile?.name || 'Not set'}`);
        addResult(`📈 Total workouts: ${userData.stats?.totalWorkouts || 0}`);
        console.log("User data:", userData);
      } else {
        addResult("❌ No user document found!");
      }
    } catch (error) {
      addResult(`❌ Error reading user: ${error}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Test 2: Read workouts subcollection
  const testReadWorkouts = async () => {
    try {
      setLoading(true);
      addResult("🔍 Testing read workouts...");
      
      const workoutsRef = collection(db, 'users', 'pZlSRSyUdbHUFsDqNL5g', 'workouts');
      const workoutsSnap = await getDocs(workoutsRef);
      
      if (!workoutsSnap.empty) {
        addResult(`✅ Found ${workoutsSnap.size} workout(s)!`);
        workoutsSnap.forEach((doc) => {
          const workout = doc.data();
          addResult(`💪 Workout: "${workout.title}" - ${workout.duration}`);
        });
      } else {
        addResult("❌ No workouts found!");
      }
    } catch (error) {
      addResult(`❌ Error reading workouts: ${error}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Test 3: Create a new test workout
  const testCreateWorkout = async () => {
    try {
      setLoading(true);
      addResult("🔍 Testing create workout...");
      
      const workoutsRef = collection(db, 'users', 'pZlSRSyUdbHUFsDqNL5g', 'workouts');
      
      const newWorkout = {
        title: "Test Workout from App",
        content: "1. Test exercise: 1 set of 1 rep\n2. Verify database connection",
        duration: "5min",
        completed: false,
        completedAt: null,
        notes: "Created from React app to test database",
        isFavorite: false,
        createdAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(workoutsRef, newWorkout);
      addResult(`✅ Created test workout with ID: ${docRef.id}`);
      
    } catch (error) {
      addResult(`❌ Error creating workout: ${error}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Test 4: Update user stats
  const testUpdateStats = async () => {
    try {
      setLoading(true);
      addResult("🔍 Testing update stats...");
      
      const userRef = doc(db, 'users', 'pZlSRSyUdbHUFsDqNL5g');
      
      // Read current stats
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentTotal = userData.stats?.totalWorkouts || 0;
        
        // Update stats
        await setDoc(userRef, {
          stats: {
            ...userData.stats,
            totalWorkouts: currentTotal + 1,
            lastWorkoutDate: serverTimestamp(),
          }
        }, { merge: true });
        
        addResult(`✅ Updated total workouts from ${currentTotal} to ${currentTotal + 1}`);
      }
    } catch (error) {
      addResult(`❌ Error updating stats: ${error}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => setResults([]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">StayFit Database Test</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button 
          onClick={testReadUser}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Read User
        </button>
        
        <button 
          onClick={testReadWorkouts}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Read Workouts
        </button>
        
        <button 
          onClick={testCreateWorkout}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test Create Workout
        </button>
        
        <button 
          onClick={testUpdateStats}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          Test Update Stats
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={clearResults}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear Results
        </button>
        {loading && <div className="flex items-center text-blue-600">Testing...</div>}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto">
        <h3 className="font-semibold mb-2">Test Results:</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">Click a test button to see results...</p>
        ) : (
          <div className="space-y-1">
            {results.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800">Testing Your Specific Document:</h4>
        <p className="text-sm text-yellow-700">
          Document ID: <code>pZlSRSyUdbHUFsDqNL5g</code>
          <br />
          Path: <code>/users/pZlSRSyUdbHUFsDqNL5g</code>
        </p>
      </div>
    </div>
  );
}