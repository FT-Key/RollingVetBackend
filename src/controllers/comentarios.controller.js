import {
  getComentariosService,
  postComentarioService,
  deleteComentarioService,
} from '../services/comentarios.service.js'; // Asegúrate de importar el servicio correcto

export const getComentariosController = async (req, res) => {
  try {
    const filters = req.filters || {}; // Obtener los filtros dinámicos
    const result = await getComentariosService(req.pagination, filters); // Pasar los filtros al servicio

    return res.status(result.statusCode).json({
      comentarios: result.comentarios,
      totalComentarios: result.totalComentarios,
      page: req.pagination ? req.pagination.page : null,
      limit: req.pagination ? req.pagination.limit : null,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const postComentarioController = async (req, res) => {
  try {
    const nuevoComentarioData = req.body; // Cambié el nombre de la variable
    const result = await postComentarioService(nuevoComentarioData);
    return res.status(result.statusCode).json({ msg: result.mensaje, nuevoComentario: result.nuevoComentario });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteComentarioController = async (req, res) => {
  try {
    const idComentario = req.params.idComentario; // Asegúrate de que el parámetro es idComentario

    const result = await deleteComentarioService(idComentario, req.user);
    return res.status(result.statusCode).json({ msg: result.mensaje });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};