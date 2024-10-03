import ComentarioModel from '../models/comentarios.schema.js'; // Asegúrate de importar el modelo de Comentarios

export const getComentariosService = async (pagination = null, filters = {}) => {
  let comentarios;
  let totalComentarios = await ComentarioModel.countDocuments(filters); // Contar solo los documentos que coincidan con los filtros

  if (pagination) {
    const { skip, limit } = pagination;
    comentarios = await ComentarioModel.find(filters)
      .skip(skip)
      .limit(limit);  // Cambia según sea necesario
  } else {
    comentarios = await ComentarioModel.find(filters);
  }

  return {
    comentarios,
    totalComentarios,
    statusCode: 200,
  };
};

export const postComentarioService = async (nuevoComentarioData) => {
  const nuevoComentario = new ComentarioModel(nuevoComentarioData);

  try {
    await nuevoComentario.save();
    return {
      mensaje: "Comentario creado con éxito!",
      statusCode: 201,
      nuevoComentario,
    };
  } catch (error) {
    console.error("Error al crear el comentario:", error.message);
    return {
      mensaje: "Error al crear el comentario",
      statusCode: 500,
      error: error.message,
    };
  }
};

export const deleteComentarioService = async (idComentario, user) => {
  // Buscar el comentario
  const comentario = await ComentarioModel.findById(idComentario);
  
  if (!comentario) {
    return {
      mensaje: "Comentario no encontrado",
      statusCode: 404,
    };
  }
  
  // Verificar si el usuario es admin
  if (user.rol === 'admin') {
    await ComentarioModel.findByIdAndDelete(idComentario);
    return {
      mensaje: "Comentario eliminado",
      statusCode: 200,
    };
  }
  
  // Si no es admin, retorna un mensaje de error
  return {
    mensaje: "No tienes permiso para eliminar este comentario",
    statusCode: 403,
  };
};