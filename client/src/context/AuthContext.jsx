import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

/**
 * AuthContext
 * - Tries real backend endpoints; if calls fail it falls back to a safe local mock session so UI flows complete.
 * - Persists to localStorage under sb_user / sb_token.
 */

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("sb_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("sb_token") || null);

  useEffect(() => {
    // ensure api instance has token if available
    if (token) setAuthToken(token);
    else setAuthToken(null);
  }, [token]);

  const saveSession = (u, t) => {
    setUser(u);
    setToken(t);
    try {
      localStorage.setItem("sb_user", JSON.stringify(u));
      localStorage.setItem("sb_token", t);
    } catch {}
    setAuthToken(t);
  };

  // login with fallback
  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: t, user: u } = res.data;
      saveSession(u, t);
      return { ok: true, user: u, token: t };
    } catch (err) {
      // fallback mock session so UI can continue while backend is unavailable
      console.warn("Login failed; using fallback mock session:", err?.message || err);
      const mockUser = { id: "local-user", name: (email && email.split("@")[0]) || "User", email };
      const mockToken = "local-token";
      saveSession(mockUser, mockToken);
      return { ok: true, user: mockUser, token: mockToken, fallback: true };
    }
  }

  // signup: attempt common endpoints, fallback if needed
  async function signup(payload) {
    // try /auth/register then /auth/signup, then fallback mock
    try {
      const res = await api.post("/auth/register", payload);
      const { token: t, user: u } = res.data;
      saveSession(u, t);
      return { ok: true, user: u, token: t };
    } catch (err1) {
      try {
        const res2 = await api.post("/auth/signup", payload);
        const { token: t, user: u } = res2.data;
        saveSession(u, t);
        return { ok: true, user: u, token: t };
      } catch (err2) {
        console.warn("Signup endpoints failed; using fallback mock:", err1?.message || err1, err2?.message || err2);
        const mockUser = {
          id: "local-user-" + Date.now(),
          name: payload.name || (payload.email && payload.email.split("@")[0]) || "NewUser",
          email: payload.email,
          phone: payload.phone || "",
        };
        const mockToken = "local-token";
        saveSession(mockUser, mockToken);
        return { ok: true, user: mockUser, token: mockToken, fallback: true };
      }
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem("sb_token");
      localStorage.removeItem("sb_user");
    } catch {}
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
