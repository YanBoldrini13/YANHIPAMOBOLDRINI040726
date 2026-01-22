import type { User } from "./authContext";

export const getInitialUser = (): User | null => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");

  if (!username || !token) {
    return null;
  }

  return { username };
};
