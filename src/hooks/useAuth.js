import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import * as authService from "../api/authService";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      setAuth({ user: data, error: null });
    } catch (err) {
      setAuth({
        user: null,
        error: err.message || "Unexpected error occurred",
      });
    }
  };

  const logout = () => {
    setAuth({ user: null, error: null });
    localStorage.removeItem("user"); // Clear user token
  };

  return {
    user: auth.user,
    error: auth.error,
    login,
    logout,
  };
};

export default useAuth;
