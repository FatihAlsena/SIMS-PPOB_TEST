import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import ErrorPage from "./pages/notFound.jsx";
import HomePage from "./pages/home.jsx";
import ProfilePage from "./pages/profile.jsx";
import TopupPage from "./pages/topup.jsx";
import ProtectedRoute from "./components/Fragments/ProtectedRoute.jsx";
import EditProfile from "./pages/editProfile.jsx";
import TransactionHistoryPage from "./pages/transactionHistory.jsx";
import ServiceDetailPage from "./components/Layouts/ServiceDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<HomePage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute element={<ProfilePage />} />,
  },
  {
    path: "/profile/edit",
    element: <ProtectedRoute element={<EditProfile />} />,
  },
  {
    path: "/topup",
    element: <ProtectedRoute element={<TopupPage />} />,
  },
  {
    path: "/services/:service_code",
    element: <ProtectedRoute element={<ServiceDetailPage />} />,
  },
  {
    path: "/transaction/history",
    element: <ProtectedRoute element={<TransactionHistoryPage />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
