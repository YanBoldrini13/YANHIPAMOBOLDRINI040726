import { useState, type ReactNode } from "react";
import { login as loginService } from "../api/auth.service";
import { getInitialUser } from "./AuthUtils";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => getInitialUser());
  const [loading] = useState(false);

  const login = async (username: string, password: string) => {
    const data = await loginService(username, password);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("username", username);

    setUser({ username });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
