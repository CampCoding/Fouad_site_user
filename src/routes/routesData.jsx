import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
import ChangePassword from "../pages/AuthPage/ChangePassword";
import ResetPassword from "../pages/AuthPage/ResetPassword";
import ReportPage from "../pages/ReportPage/ReportPage";
import ReportShipping from "../pages/ReportPage/ReportShipping";
import ReportSending from "../pages/ReportPage/ReportSending";
import NotificationPage from "../components/pages/NotificationPage/NotificationPage";
import Reservations from "../components/pages/Reservations/Reservations";
import ReservationInstructions from "../components/pages/Reservations/ReservationInstructions";
import ContactUsPage from "../components/pages/ContactUsPage/ContactUsPage";
import EducationPage from '../pages/Education/Education';
import Branches from '../pages/Branches/Branches';
import Services from '../pages/Services/Services';
import Team from '../pages/Team/Team';
import Settings from '../pages/Settings/Settings';
import Profile from '../pages/Profile/Profile';
import Notifications from '../pages/Notifications/Notifications';
import PinPage from '../pages/PinPage/PinPage';
import SharePage from '../pages/SharePage/SharePage'
import Instructions from "../pages/Instructions/Instructions";
import Rating from "../pages/Rating/Rating";
import Offers from "../pages/Offers/Offers";
import Consultations from "../pages/Consultations/Consultations";
import News from "../pages/News/News";

export const routesData = [
  {
    id: 1,
    name: "Home",
    path: "/",
    element: <HomePage />,
  },
  {
    id: 2,
    name: "Login",
    path: "/login",
    element: <LoginPage />,
  },
  {
    id: 3,
    name: "Register",
    path: "/register",
    element: <RegisterPage />,
  },
  {
    id: 4,
    name: "Change Password",
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    id: 5,
    name: "Reset Password",
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    id: 6,
    name: "Reports",
    path: "/reports",
    element: <ReportPage />,
  },
  {
    id: 7,
    name: "Report Shipping",
    path: "/report-shipping/:id",
    element: <ReportShipping />,
  },
  {
    id: 8,
    name: "Report Sending",
    path: "/report-sending/:id",
    element: <ReportSending />,
  },
  {
    id: 9,
    name: "Report Notification",
    path: "/notifications/:id",
    element: <NotificationPage />,
  },
  {
    id: 10,
    name: "Reservations",
    path: "/reservations/:type?",
    element: <Reservations />,
  },
  {
    id: 11,
    name: "Reservations Instruction",
    path: "/reservations-instruction",
    element: <ReservationInstructions />,
  },
  {
    id: 12,
    name: "Contact Us",
    path: "/contact-us",
    element: <ContactUsPage />,
  },
  {
    id: 13,
    name: "Education",
    path: "/education",
    element: <EducationPage />,
  },
  {
    id: 14,
    name: "Branches",
    path: "/branches",
    element: <Branches />,
  },
  {
    id: 15,
    name: "Services",
    path: "/services",
    element: <Services />,
  },
  {
    id: 16,
    name: "Team",
    path: "/team",
    element: <Team />,
  },
  {
    id: 17,
    name: "Settings",
    path: "/settings",
    element: <Settings />,
  },
  {
    id: 18,
    name: "Profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    id: 19,
    name: "Notifications",
    path: "/notifications",
    element: <Notifications />,
  },
  {
    id: 20,
    name: "PinPage",
    path: "/pin",
    element: <PinPage />,
  },
  {
    id: 21,
    name: "SharePage",
    path: "/share",
    element: <SharePage />,
  },

  {
    id: 22,
    name: "Instructions",
    path: "/instructions",
    element: <Instructions />,
  },

  {
    id: 23,
    name: "Rating",
    path: "/rating",
    element: <Rating />,
  },
  {
    id: 24,
    name: "Offers",
    path: "/offers",
    element: <Offers />,
  },
  {
    id: 25,
    name: "Consultations",
    path: "/consultations",
    element: <Consultations />,
  },
  {
    id: 26,
    name: "News",
    path: "/news",
    element: <News />,
  },
]