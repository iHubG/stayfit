import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Page from "../components/Page"; // adjust path as needed

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const WorkoutPlans = lazy(() => import("../pages/WorkoutPlans"));
const Profile = lazy(() => import("../pages/Profile"));
const ProfileSetup = lazy(() => import("../pages/ProfileSetup")); 
const NotFound = lazy(() => import("../pages/NotFound"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Page title="StayFit | Home"><Home /></Page>,
  },
  {
    path: "/login",
    element: <Page title="StayFit | Login"><Login /></Page>,
  },
  {
    path: "/register",
    element: <Page title="StayFit | Register"><Register /></Page>,
  },
  {
    path: "/profile-setup", 
    element: (
      <PrivateRoute>
        <Page title="StayFit | Profile Setup"><ProfileSetup /></Page>
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Page title="StayFit | Dashboard"><Dashboard /></Page>
      </PrivateRoute>
    ),
  },
  {
    path: "/workouts",
    element: (
      <PrivateRoute>
        <Page title="StayFit | Workout Plans"><WorkoutPlans /></Page>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Page title="StayFit | Profile"><Profile /></Page>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Page title="StayFit | Not Found"><NotFound /></Page>,
  },
];
