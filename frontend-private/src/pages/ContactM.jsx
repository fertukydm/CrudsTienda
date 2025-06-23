import React, { useEffect, useState } from "react";
import "./ContactM.css";

const AdminContactos = () => {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4001/api/contacts")
      .then((res) => res.json())
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);

  return (
    <div className="admin-contactos-container">
      <h1>Mensajes de Contacto</h1>

      <div className="admin-card">
        {mensajes.length === 0 ? (
          <p className="sin-mensajes">No hay mensajes disponibles.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Mensaje</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminContactos;
