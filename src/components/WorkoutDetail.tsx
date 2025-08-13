// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../libs/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import Layout from "../components/layout/layout";

// type Workout = {
//   id: string;
//   title?: string;
//   duration?: string;
//   content?: string;
//   // add other fields as needed
// };

// export default function WorkoutDetail() {
//   const { id } = useParams();
//   const [user] = useAuthState(auth);
//   const [workout, setWorkout] = useState<Workout | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user || !id) return;
//     const fetchWorkout = async () => {
//       const docRef = doc(db, "users", user.uid, "workouts", id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setWorkout({ id: docSnap.id, ...docSnap.data() });
//       } else {
//         setWorkout(null); // handle not found
//       }
//       setLoading(false);
//     };
//     fetchWorkout();
//   }, [user, id]);

//   if (loading) return <Layout><div>Loading workout...</div></Layout>;

//   if (!workout) return <Layout><div>Workout not found</div></Layout>;

//   return (
//     <Layout>
//       <div className="max-w-4xl mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">{workout.title || "Workout Detail"}</h2>
//         <p>{workout.duration}</p>
//         <div>{workout.content}</div>
//         {/* Add buttons or details as needed */}
//       </div>
//     </Layout>
//   );
// }
