import React, { useState } from "react"; 
import './RegistroEmpleado.css';

const RegistrarEmpleados = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthday: '',
    email: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [error, setError] = useState('');   // para mostrar errores
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validaciones básicas
    const { name, lastName, birthday, email, address, password } = formData;
  
    if (!name.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Correo electrónico no válido.');
      return;
    }
  
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    const today = new Date().toISOString().split('T')[0];
    if (birthday > today) {
      setError('La fecha de nacimiento no puede ser en el futuro.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:3000/api/registerEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Empleado exitoso:', data);
        alert('¡Empleado registrado exitosamente!');
  
        // Limpiar formulario
        setFormData({
          name: '',
          lastName: '',
          birthday: '',
          email: '',
          address: '',
          password: '',
        });
      } else {
        setError(data.message || 'Error al crear empleado');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de red o del servidor.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="registro-container">
      <div className="registro-image">
        <img src="/23.png" alt="Registrar Empleado" />
      </div>
      <div className="registro-form">
        <h2>Registrar Empleado</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Apellido</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>Fecha de Nacimiento</label>
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />

          <label>Correo Electrónico</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Dirección</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />

          <label>Contraseña</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarEmpleados;