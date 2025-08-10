import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
import ClipLoader from "react-spinners/ClipLoader";

export default function App() {
  const element = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#4f46e5" size={50} />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}
