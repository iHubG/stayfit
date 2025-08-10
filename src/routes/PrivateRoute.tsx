import { Navigate } from "react-router-dom";
import { useAuth } from "../libs/useAuth";
import ClipLoader from "react-spinners/ClipLoader";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="#4f46e5" size={50} /> {/* Tailwind primary color */}
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}
