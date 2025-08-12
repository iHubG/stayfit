import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Page from "../components/Page"; // adjust path as needed

// Lazy load pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Chat = lazy(() => import("../pages/Chat"));
const Workouts = lazy(() => import("../pages/Workouts"));
const WorkoutDetail = lazy(() => import("../components/WorkoutDetail"));
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
    path: "/chat",
    element: (
      <PrivateRoute>
        <Page title="StayFit | Chat"><Chat /></Page>
      </PrivateRoute>
    ),
  },
  {
    path: "/workouts",
    element: (
      <PrivateRoute>
        <Page title="StayFit | Workout "><Workouts /></Page>
      </PrivateRoute>
    ),
  },
  {
    path: "/workout/:id",
    element: (
      <PrivateRoute>
        <Page title="StayFit | Workout Details "><WorkoutDetail /></Page>
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
