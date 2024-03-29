import { ReactNode, createContext, useContext } from "react";
import User from "../entities/user/User";
import api from "../api";
import Cookies from "js-cookie";
import base from "../api/base.api";
import useSessionStorage from "../hooks/storage/useSessionStorage";

export type AuthContent = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContent);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: JSX.Element | ReactNode }) {
  const [user, setUser] = useSessionStorage<User | null>({ key: "test-diogofpina-user", initialValue: null });
  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.auth.login({ email, password });

      if (!response || response.status !== 200) throw new Error("Login failed");

      const { token, user } = response.data;

      Cookies.set("test-diogojpina-token", token, { expires: 1 });

      base.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      Cookies.remove("test-diogojpina-token");

      await setUser(null);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
}
