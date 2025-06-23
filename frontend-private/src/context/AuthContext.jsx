import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const Login = async (email, password) => {
    if (!email || !password) {
      toast.error("Por favor, completa todos los campos.");
      return false;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:4001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Credenciales incorrectas");
        setIsLoggedIn(false);
        return false;
      }

      // ✅ Guardar token y datos del usuario
      const { token, userType, message } = data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ email, userType }));
      
      setUser({ email, userType });
      setIsLoggedIn(true);
      
      toast.success(message || "Inicio de sesión exitoso");
      
      // ✅ Retornar también el userType para que Login.jsx pueda manejarlo
      return { success: true, userType };

    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error de conexión con el servidor");
      setIsLoggedIn(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    try {
      // ✅ Limpiar todo el localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(false);
      toast.success("Sesión cerrada.");
      return true;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
      return false;
    }
  };

  // ✅ Verificar si hay un usuario guardado al cargar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("authToken");
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        // Limpiar datos corruptos
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        Login, 
        logOut, 
        isLoggedIn, 
        setIsLoggedIn, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);