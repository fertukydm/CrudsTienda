import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function RatingCard() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleCommentChange = (e) => {
    if (e.target.value.length <= 500) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = () => {
    console.log('Calificación:', rating);
    console.log('Comentario:', comment);
    // Aquí puedes agregar la lógica para enviar los datos
    alert(`Calificación: ${rating} estrellas\nComentario: ${comment}`);
  };

  const remainingChars = 500 - comment.length;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Califica tu experiencia
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Comparte tu opinión y ayuda a otros usuarios
        </p>
        
        {/* Sistema de estrellas */}
        <div className="flex items-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
            >
              <Star
                size={28}
                className={`transition-colors ${
                  star <= (hoveredStar || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm font-medium text-gray-700">
              {rating} de 5 estrellas
            </span>
          )}
        </div>

        {/* Área de comentarios */}
        <div>
          <div className="mb-4">
            <label 
              htmlFor="comment" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Comentario
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Escribe tu comentario aquí..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                Máximo 500 caracteres
              </span>
              <span className={`text-xs ${remainingChars < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} restantes
              </span>
            </div>
          </div>

          {/* Botón de envío */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              rating === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            Enviar Calificación
          </button>
        </div>
      </div>

      {/* Vista previa de la calificación */}
      {rating > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Vista previa:</h4>
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-sm text-gray-600">({rating}/5)</span>
          </div>
          {comment && (
            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              "{comment}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}