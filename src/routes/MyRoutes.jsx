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
import AddOpositionForm from "../components/Forms/AddOpositionForm";
import AdminConsoleOposiciones from "../pages/Home/AdminConsoleOposiciones";
import PrintOpositionView from "../components/PrintView/PrintOpsitionView";

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
        <Route path="/add-oposition-form" element={<AddOpositionForm />} />
        <Route
          path="/admin-console-oposition"
          element={<AdminConsoleOposiciones />}
        />
        <Route path="/print-Oposition" element={<PrintOpositionView />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
