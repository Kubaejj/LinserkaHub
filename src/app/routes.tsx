import { createHashRouter } from "react-router";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import EventDetails from "./components/EventDetails";
import CofficeStatus from "./components/CofficeStatus";
import UserProfile from "./components/UserProfile";
import CalendarPage from "./components/CalendarPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Onboarding,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/calendar",
    Component: CalendarPage,
  },
  {
    path: "/event/:id",
    Component: EventDetails,
  },
  {
    path: "/coffice",
    Component: CofficeStatus,
  },
  {
    path: "/profile",
    Component: UserProfile,
  },
]);
