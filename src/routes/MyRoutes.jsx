import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";
import HomePage from "../pages/Home/HomePage";
import AdminConsole from "../pages/Home/AdminConsole";
import LoginForm from "../pages/Login/LoginForm";

const MyRoutes = () => {
  const auth = useRecoilValue(authState);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            auth.user ? (
              auth.user.role === "admin" ? (
                <AdminConsole />
              ) : (
                <HomePage />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
