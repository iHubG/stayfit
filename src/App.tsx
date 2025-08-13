import { Suspense, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";
import { Dumbbell } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { auth } from "./libs/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Analytics } from "@vercel/analytics/react"

function checkLoginExpiry(): boolean {
  const timestamp = localStorage.getItem("loginTimestamp");
  if (timestamp) {
    const oneWeek = 7 * 24 * 60 * 60 * 1000; 
    if (Date.now() - parseInt(timestamp, 10) > oneWeek) {
      signOut(auth);
      localStorage.removeItem("loginTimestamp");
      return false;
    }
    return true;
  }
  return false;
}

export default function App() {
  const element = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    const svgString = encodeURIComponent(
      renderToStaticMarkup(<Dumbbell size={32} color="#4f46e5" />)
    );
    const faviconUrl = `data:image/svg+xml,${svgString}`;
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isValid = checkLoginExpiry();

      if (user && isValid) {
        if (window.location.pathname === "/") {
          navigate("/dashboard"); 
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"></div>}>
      {element}
      <Analytics />
    </Suspense>
  );
}
