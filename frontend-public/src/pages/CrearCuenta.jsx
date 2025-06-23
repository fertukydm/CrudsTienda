import React, { useState } from 'react';
import './CrearCuenta.css';
import { Toaster, toast } from 'react-hot-toast';

const CrearCuenta = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos son obligatorios.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Correo inválido.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:4001/api/registerClients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.nombre,
          lastName: formData.apellidos,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Cuenta creada correctamente.");
        // Limpiar formulario
        setFormData({
          nombre: "",
          apellidos: "",
          email: "",
          password: ""
        });
      } else {
        toast.error(data.message || "Error al crear cuenta.");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor.");
      console.error("Error:", error);
    }
  };

  return (
    
    <div className="crear-cuenta-container">
      <Toaster position="top-center" />

      <div className="form-section">
        <form onSubmit={handleSubmit} className="formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input"
          />
          {errors.nombre && <p className="error">{errors.nombre}</p>}

          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="input"
          />
          {errors.apellidos && <p className="error">{errors.apellidos}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" className="boton">Crear</button>

          <p className="link">
            ¿Ya tienes una cuenta? <a href="/login">Conectarme a mi cuenta</a>
          </p>
        </form>
      </div>

      <div className="image-section">
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default CrearCuenta;
