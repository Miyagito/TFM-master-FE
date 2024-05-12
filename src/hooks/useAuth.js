import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import authServiceAPI from "../api/services/auth/authServicesAPI";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = async (username, password) => {
    try {
      const data = await authServiceAPI.login(username, password);
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
