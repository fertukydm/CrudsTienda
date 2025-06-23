


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Producto.css";

const AgregarProducto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const price = parseFloat(data.price);
    if (isNaN(price)) {
      console.error("El precio debe ser un número válido.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorName: data.authorName,
          productName: data.productName,
          description: data.description,
          price: price,
          imageUrl: imagePreview,
          genre: data.genre,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      const newProduct = await response.json();
      console.log('Producto guardado:', newProduct);
      navigate("/carrito");
    } catch (error) {
      console.error("Error:", error);
    }
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

          {/* Nombre del autor */}
          <div className="form-field">
            <label>Nombre del autor:</label>
            <input
              type="text"
              placeholder="Nombre del autor"
              {...register("authorName", { required: true })}
            />
            {errors.authorName && <p className="error-message">El nombre del autor es obligatorio.</p>}
          </div>

          {/* Imagen */}
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

          {/* Nombre del producto */}
          <div className="form-field">
            <label>Nombre del producto:</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              {...register("productName", { required: true })}
            />
            {errors.productName && <p className="error-message">El nombre es obligatorio.</p>}
          </div>

          {/* Descripción */}
          <div className="form-field">
            <label>Descripción:</label>
            <textarea
              placeholder="Descripción del producto"
              {...register("description", { required: true })}
            />
            {errors.description && <p className="error-message">La descripción es obligatoria.</p>}
          </div>

          {/* Precio */}
          <div className="form-field">
            <label>Precio:</label>
            <input
              type="number"
              placeholder="Precio"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {errors.price && <p className="error-message">El precio es obligatorio.</p>}
          </div>

          {/* Género */}
          <div className="form-field">
            <label>Género:</label>
            <input
              type="text"
              placeholder="Ej: Rock, Pop, Jazz"
              {...register("genre", { required: true })}
            />
            {errors.genre && <p className="error-message">El género es obligatorio.</p>}
          </div>

          {/* Botón */}
          <button type="submit" className="save-button">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;