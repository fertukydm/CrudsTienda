import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Producto.css";

const AgregarProducto = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    // Asegúrate de que el precio sea un número válido
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
          authorName: data.authorName,  // Asegúrate de que este campo se incluya
          productName: data.productName,  // Nombre del producto
          description: data.description, // Descripción
          price: price,  // Precio
          imageUrl: imagePreview,  // Imagen del producto
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      const newProduct = await response.json();
      console.log('Producto guardado:', newProduct);

      navigate("/carrito");  // Redirigir al carrito
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función que maneja el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Guardamos la URL de la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-product-card-container">
      <div className="add-product-card">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
          {/* Campo para autor del producto */}
          <div className="form-field">
            <label>Nombre del autor:</label>
            <input
              type="text"
              placeholder="Nombre del autor"
              {...register("authorName", { required: true })}  // Aquí agregamos el campo authorName
            />
            {errors.authorName && <p className="error-message">El nombre del autor es obligatorio.</p>}
          </div>

          {/* Campo para imagen */}
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

          {/* Campo para nombre del producto */}
          <div className="form-field">
            <label>Nombre del producto:</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              {...register("productName", { required: true })}  // Cambié name a productName
            />
            {errors.productName && <p className="error-message">El nombre es obligatorio.</p>}
          </div>

          {/* Campo para descripción del producto */}
          <div className="form-field">
            <label>Descripción:</label>
            <textarea
              placeholder="Descripción del producto"
              {...register("description", { required: true })}
            />
            {errors.description && <p className="error-message">La descripción es obligatoria.</p>}
          </div>

          {/* Campo para precio */}
          <div className="form-field">
            <label>Precio:</label>
            <input
              type="number"
              placeholder="Precio"
              {...register("price", { required: true, valueAsNumber: true })}  // Asegurarse de que sea numérico
            />
            {errors.price && <p className="error-message">El precio es obligatorio.</p>}
          </div>

          {/* Botón para guardar el producto */}
          <button type="submit" className="save-button">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;

