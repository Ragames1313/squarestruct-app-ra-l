import { db } from '../app.js';
import { getLocaleFromRequest, getLocalizedMessage } from '../utils/localization.js';

export const crearResena = async (req, res) => {
    try {
        const { idProducto, calificacion, comentario } = req.body;
        const idUsuario = req.user.idUsuario; // Obtenemos el ID del usuario autenticado desde el middleware
        const locale = getLocaleFromRequest(req);

        // Validar que el producto exista
        const [productos] = await db.query('SELECT idProducto FROM productos WHERE idProducto = ?', [idProducto]);
        if (productos.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        // Insertar la reseña en la base de datos
        await db.query(
            'INSERT INTO resenas (idProducto, idUsuario, calificacion, comentario) VALUES (?, ?, ?, ?)',
            [idProducto, idUsuario, calificacion, comentario]
        );
        res.status(201).json({
            mensaje: getLocalizedMessage(locale, {
                es: 'Reseña creada exitosamente',
                en: 'Review created successfully'
            })
        });
}
    catch (error) {
        res.status(500).json({
            error: getLocalizedMessage(getLocaleFromRequest(req), {
                es: 'Error al crear la reseña',
                en: 'Error while creating the review'
            }),
            detalle: error.message
        });
    }
};