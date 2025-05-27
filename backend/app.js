import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import loginRoutes from './routes/loginRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb://localhost:27017/CrudsTienda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Usar rutas
app.use('/api/login', loginRoutes);

// Servidor en puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

export default app;
