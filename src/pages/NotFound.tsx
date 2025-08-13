import { Link } from "react-router-dom";
import { Dumbbell, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 text-center">
      <h1 className="text-[6rem] font-extrabold text-[#4f46e5] leading-none">
        404
      </h1>

      <Dumbbell className="w-10 h-10 text-[#4f46e5] mb-4" />

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#4f46e5] text-white rounded hover:bg-indigo-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
