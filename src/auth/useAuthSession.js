import { useCallback, useEffect, useState, useRef } from "react";
import { getCookie, removeCookies, setCookie, redirectToHome } from "../utils/UtilFunctions";
import { API_BASE } from "../config";
import api from "./api";

const initialUserState = {
  name: "",
  isAuthenticated: false,
  roles: "DEFAULT",
};

export const useAuthSession = () => {
  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState(false);
  const didInit = useRef(false);

  const generateRefreshToken = useCallback(async () => {
    try {
      const response = await api.post(`${API_BASE}/auth/token/refresh`);
      setCookie("access_token", response.data.access_token, 900000);
      setCookie("refresh_token", response.data.refresh_token, 86400000);
    } catch (err) {
      removeCookies(["access_token", "refresh_token"]);
      redirectToHome();
      setLoading(false);
    } finally {
      setAuthReady(true);
    }
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const response = await api.get(`${API_BASE}/users/profile`);
      setUser({
        name: response.data.username,
        isAuthenticated: true,
        roles: response.data.role,
        permissions: response.data.permissions,
        lastLoginDate: response.data.lastLoginDate
      });
    } catch (err) {
      if (err.response.status === 401) {
        await generateRefreshToken();
        try {
          const response = await api.get(`${API_BASE}/users/profile`);
          setUser({
            name: response.data.username,
            isAuthenticated: true,
            roles: response.data.role,
            permissions: response.data.permissions
          });
        } catch {
          setError(true);
        }
      }
    } finally {
      setLoading(false);
      setAuthReady(true);
    }
  }, [generateRefreshToken]);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const verifyToken = async () => {
      if (getCookie("access_token")) {
        try {
          await api.post(`${API_BASE}/auth/token/verify`);
        } catch {
          await generateRefreshToken();
        }
        loadUserData();
      } else {
        setLoading(false);
        setAuthReady(true);
      }
    };
    verifyToken();
    
  }, [loadUserData, generateRefreshToken]);

  const refreshUserData = () => {
    setLoading(true);
    loadUserData();
  };

  return { user, loading, error, authReady, refreshUserData };
};
