import { useState } from "react";

const SERVER_URL = "http://localhost:4000/api";

const useAuthApi = () => {
  const login = async (email, password) => {
    const response = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      credentials: "include", // si usas cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la autenticación");
    }

    const data = await response.json();
    alert(data.message);
    return data;
  };

  return { login };
};

export default useAuthApi;
