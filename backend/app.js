import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import loginRoutes from './routes/loginRoutes.js';
 
const app = express();
 
app.use(cors()); // permite que el frontend se conecte
app.use(express.json()); // para leer JSON en req.body
 
// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/mongodb+srv://sofiaguillen2201:HMpccuUX6CqxrR00@cluster0.xtxj9.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
// Usar las rutas
app.use('/api/login', loginRoutes);
 
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
 
export default app;