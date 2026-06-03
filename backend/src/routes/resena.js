import adminMiddleware from '../middlewares/admin.js';

// Rutas de reseñas 
import express from 'express';
import { crearResena } from '../controllers/resenaController.js';
import authMiddleware from '../middlewares/auth.js';
import { validarResena } from '../middlewares/validacionResena.js';
const router = express.Router();

router.post('/', authMiddleware, validarResena, crearResena);

export default router;