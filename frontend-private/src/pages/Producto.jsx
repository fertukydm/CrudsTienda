import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Producto.css"

const AgregarProducto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Simulamos el proceso de guardar el producto
    console.log(data);

    // Aquí puedes enviar los datos al backend si lo deseas
    // await fetch('http://localhost:4000/api/Products', { method: 'POST', body: data });

    // Después de guardar el producto, redirigir a la pantalla del carrito
    navigate("/carrito");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-product-card-container">
      <div className="add-product-card">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
          <div className="form-field">
            <label>Imagen:</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              onChange={handleImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Vista previa" className="image-preview" />}
            {errors.image && <p className="error-message">La imagen es obligatoria.</p>}
          </div>

          <div className="form-field">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="error-message">El nombre es obligatorio.</p>}
          </div>

          <div className="form-field">
            <label>Descripción:</label>
            <textarea
              placeholder="Descripción del producto"
              {...register("description", { required: true })}
            />
            {errors.description && <p className="error-message">La descripción es obligatoria.</p>}
          </div>

          <div className="form-field">
            <label>Precio:</label>
            <input
              type="number"
              placeholder="Precio"
              {...register("price", { required: true })}
            />
            {errors.price && <p className="error-message">El precio es obligatorio.</p>}
          </div>

          <button type="submit" className="save-button">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;

