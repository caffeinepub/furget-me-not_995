import React from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === "logging-in";

  const text =
    loginStatus === "logging-in"
      ? "Signing in..."
      : isAuthenticated
        ? "Sign Out"
        : "Sign In";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error("Login error:", error);
        if (error.message === "User is already authenticated") {
          await clear();
          setTimeout(() => {
            login();
          }, 300);
        }
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={disabled}
      className={`px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:transform-none ${
        isAuthenticated
          ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
          : "bg-white text-purple-600 hover:bg-gray-100 shadow-lg"
      }`}
    >
      {text}
    </button>
  );
}
