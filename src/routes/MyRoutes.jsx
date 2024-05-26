import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../atoms/authAtom";
import UserConsoleLeyes from "../pages/Home/UserConsoleLeyes";
import AdminConsoleLeyes from "../pages/Home/AdminConsoleLeyes";
import LoginForm from "../pages/Login/LoginForm";
import PrintView from "../components/PrintView/PrintView";
import PrintAllLawView from "../components/PrintView/PrintAllLawView";
import Home from "../pages/Home/HomePage";

const MyRoutes = () => {
  const auth = useRecoilValue(authState);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={auth.user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/print-view" element={<PrintView />} />
        <Route path="/print-all-law-view" element={<PrintAllLawView />} />
        <Route path="/admin-console-leyes" element={<AdminConsoleLeyes />} />
        <Route path="/user-console-leyes" element={<UserConsoleLeyes />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
