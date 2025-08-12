import { Navigate } from "react-router-dom";
import { useAuth } from "../libs/useAuth";
// import PulseLoader from "react-spinners/PulseLoader";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* <PulseLoader color="#4f46e5" size={12} /> Tailwind primary color */}
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}
