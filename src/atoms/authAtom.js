import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
  },
});
