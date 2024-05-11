import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";
import HomePage from "../pages/Home Page/HomePage";
import LoginForm from "../pages/Login/LoginForm";

const MyRoutes = () => {
  const auth = useRecoilValue(authState);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={auth.user ? <HomePage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
