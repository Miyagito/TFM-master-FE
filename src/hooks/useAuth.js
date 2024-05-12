import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import axios from "../api/axios/axiosConfig";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      setAuth({ user: { role: response.data.role }, error: null });
    } catch (error) {
      setAuth({
        user: null,
        error: error.response?.data?.error || "Error de inicio de sesión",
      });
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setAuth({ user: null, error: null });
    } catch (error) {
      console.log("Error al cerrar sesión:", error.response?.data?.error);
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get("/verify-session");
      if (response.data.user) {
        setAuth({ user: { role: response.data.user.role }, error: null });
      } else {
        setAuth({ user: null, error: "Sesión no válida" });
      }
    } catch (error) {
      setAuth({ user: null, error: "Sesión no válida" });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return {
    user: auth.user,
    error: auth.error,
    login,
    logout,
  };
};

export default useAuth;
