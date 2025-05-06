import './Contact.css';

const Contactanos = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="contact-page">
      <main className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            className="contact-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="contact-input"
            required
          />
          <textarea
            placeholder="Mensaje"
            className="contact-textarea"
            rows="6"
            required
          ></textarea>
          <button type="submit" className="contact-button">
            Enviar
          </button>
        </form>

       
        <div>
          <img
            src="../public/25.png"
            className="contact-image"
          />
        </div>
      </main>

    <section className="contact-socials">
    <div>
    <h2 className="contact-section-title">Nuestras Redes Sociales</h2>
    <div className="contact-icons">
      <a href="" target="_blank" rel="noopener noreferrer">
        <img src="../public/35.png" alt="Instagram" className="contact-social-image" />
      </a>
      <a href="" target="_blank" rel="noopener noreferrer">
        <img src="../public/37.png" alt="Facebook" className="contact-social-image" />
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
      <a href="">
        <img src="../public/36.png" alt="Correo Electrónico" className="contact-social-image" />
      </a>
      <a href="" target="_blank" rel="noopener noreferrer">
        <img src="../public/38.png" alt="WhatsApp" className="contact-social-image" />
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
