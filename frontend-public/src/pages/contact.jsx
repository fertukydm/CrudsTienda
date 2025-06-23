import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./contact.css";

const Contactanos = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4001/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Mensaje enviado correctamente");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div className="contact-page">
      <Toaster position="top-center" />
      <main className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="contact-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="contact-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            className="contact-textarea"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="contact-button">
            Enviar
          </button>
        </form>

        <div>
          <img
            src="/25.png"
            alt="Decoración"
            className="contact-image"
          />
        </div>
      </main>

      <section className="contact-socials">
        <div>
          <h2 className="contact-section-title">Nuestras Redes Sociales</h2>
          <div className="contact-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="/35.png" alt="Instagram" className="contact-social-image" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="/37.png" alt="Facebook" className="contact-social-image" />
            </a>
          </div>
          <div className="contact-social-names">
            <span>OKrecordssv</span>
            <span>OKrecordssv</span>
          </div>
        </div>

        <div>
          <h2 className="contact-section-title">Escríbenos</h2>
          <div className="contact-icons">
            <a href="#">
              <img src="/36.png" alt="Correo Electrónico" className="contact-social-image" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="/38.png" alt="WhatsApp" className="contact-social-image" />
            </a>
          </div>
          <div className="contact-social-names">
            <span>OKRecords@gmail.com</span>
            <span>+503 2933 1920</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactanos;
