// context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aquí puedes guardar info del usuario
  

  const Login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include", // Para enviar cookies si las usas
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Si status no es 200..299
        return false;
      }

      const data = await res.json();
      setUser(data.user || { email }); // Guarda datos básicos del usuario
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const Logout = () => {
    setUser(null);
    // Aquí podrías llamar a backend para cerrar sesión también
  };

  return (
    <AuthContext.Provider value={{ user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
