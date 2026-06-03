//Middleware de cracion de resenas
export const validarResena = (req, res, next) => {
    const { idProducto, calificacion, comentario } = req.body;

    if (!idProducto || !calificacion || !comentario) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (calificacion < 1 || calificacion > 5) {
        return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    next();
};