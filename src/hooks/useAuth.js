import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import authServiceAPI from "../api/services/auth/authServicesAPI";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [userName, setUserName] = useState("");
  const login = async (username, password) => {
    try {
      const data = await authServiceAPI.login(username, password);
      if (username) {
        setUserName(username);
      }
      setAuth({ user: { role: data.role }, error: null });
    } catch (error) {
      setAuth({
        user: null,
        error: error.error || "Error de inicio de sesión",
      });
    }
  };

  const logout = async () => {
    try {
      await authServiceAPI.logout();
      setUserName("");
      setAuth({ user: null, error: null });
    } catch (error) {
      console.log("Error al cerrar sesión:", error.error);
    }
  };

  const checkSession = async () => {
    try {
      const data = await authServiceAPI.verifySession();
      if (data.user) {
        setAuth({ user: { role: data.user.role }, error: null });
        setUserName(data.user.username);
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
    userName,
    user: auth.user,
    error: auth.error,
    login,
    logout,
  };
};

export default useAuth;
