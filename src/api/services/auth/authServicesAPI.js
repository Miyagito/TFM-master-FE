import axios from "../../axios/axiosConfig";

const login = async (username, password) => {
  try {
    const response = await axios.post("/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = async () => {
  try {
    await axios.post("/logout");
  } catch (error) {
    throw error.response.data;
  }
};

const verifySession = async () => {
  try {
    const response = await axios.get("/verify-session");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  login,
  logout,
  verifySession,
};
