import UserModel from "../models/usuario.schema.js";


export const getUsuariosService = async () => {
  const usuarios = await UserModel.find();
  return {
    usuarios,
    statusCode: 200,
  };
};

export const getUsuarioService = async (idUsuario) => {
  const usuario = await UserModel.findOne({ _id: idUsuario });

  if (usuario) {
    return {
      usuario,
      statusCode: 200,
    };
  } else {
    return {
      mensaje: "Usuario no encontrado",
      statusCode: 404,
    };
  }
};

export const postUsuarioService = async (nuevoUsuarioData) => {

 /*  const ROLES = ['cliente', 'admin']

  const usuarioExiste = await UserModel.findOne({
    nombreUsuario: nuevoUsuarioData.nombreUsuario,
  });

  if (usuarioExiste) {
    return {
      mensaje: "Usuario no disponible",
      statusCode: 400,
    }
  }

  if (nuevoUsuarioData?.rol && ROLES.includes(nuevoUsuarioData?.rol)) {
    return {
      mensaje: "Rol inválido",
      statusCode: 400,
    }
  } */

  const nuevoUsuario = await UserModel(nuevoUsuarioData);
  await nuevoUsuario.save();

  return {
    mensaje: "Usuario creado con éxito!",
    statusCode: 201,
    nuevoUsuario,
  };
};

export const putUsuarioService = async (idUsuario, usuarioData) => {
  
  const usuarioActualizado = await UserModel.findOneAndUpdate(
    { _id: idUsuario },
    usuarioData,
  );

  return {
    mensaje: "Usuario actualizado",
    usuario: usuarioActualizado,
    statusCode: 200,
  };
};

export const deleteUsuarioService = async (idUsuario) => {

  await UserModel.findByIdAndDelete({ _id: idUsuario });

  return {
    mensaje: "Usuario eliminado",
    statusCode: 200,
  };
};