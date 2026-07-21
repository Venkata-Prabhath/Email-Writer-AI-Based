import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Browser from "../pages/Browser";
import Tasks from "../pages/Tasks";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/browser" element={<Browser />} />

          <Route path="/tasks" element={<Tasks />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;