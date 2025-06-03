import React, { useState, useRef } from "react";

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
const [loading, setLoading] = useState(false);




 //Logica para login 
 const handleSubmit = async (e) => {
  
    e.preventDefault();
    setError('');
    setLoading(true);

  try {
    const response = await fetch('http://localhost:3000/api/registerEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
  name: formData.name,
  lastName: formData.lastName,
  birthday: formData.birthday,
  email: formData.email,
  address: formData.address,
  password: formData.password
}),


    });

  const data = await response.json();

  if (response.ok) {
    // Si el empleado es exitoso, mostrar mensaje
    console.log('Empleado exitoso:', data);
    alert('Empleado registrado!');
  } else {
    // Si hay algún error, mostrar mensaje
    setError(data.message || 'Error al crear empleado');
  }
} catch (error) {
  console.error('Error de conexión:', error);
  setError('Error de red o del servidor');
} finally {
  setLoading(false);  // Desactivar carga
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
 {/* Mostrar mensaje de error si hay */}
          {error && <p className="error">{error}</p>}
          <button type="submit">Registrar</button>
          
        </form>
      </div>
    </div>
  );
  
};


export default RegistrarEmpleados;
