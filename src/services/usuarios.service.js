import UserModel from "../models/usuario.schema.js";
import CartModel from "../models/carrito.schema.js";
import FavModel from "../models/favoritos.schema.js";
import cloudinary from "../helpers/cloudinary.config.js";

export const getUsuariosService = async (pagination = null) => {
  let usuarios;
  let totalUsuarios = await UserModel.countDocuments(); // Obtener el total de usuarios en cualquier caso

  if (pagination) {
    const { skip, limit } = pagination;
    usuarios = await UserModel.find()
      .skip(skip)
      .limit(limit);
  } else {
    usuarios = await UserModel.find(); // Si no hay paginación, traer todos los usuarios
  }

  return {
    usuarios,
    totalUsuarios,  // Enviar el total de usuarios en ambos casos
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
  // Crear el usuario
  const nuevoUsuario = new UserModel(nuevoUsuarioData);

  // Crear el carrito y favoritos asociados al nuevo usuario
  const carrito = new CartModel({ idUsuario: nuevoUsuario._id });
  const favoritos = new FavModel({ idUsuario: nuevoUsuario._id });
  await carrito.save();
  await favoritos.save();

  // Asignar los IDs de carrito y favoritos al usuario
  nuevoUsuario.idCarrito = carrito._id;
  nuevoUsuario.idFavoritos = favoritos._id;

  // Guardar el usuario en la base de datos
  await nuevoUsuario.save();

  return {
    mensaje: "Usuario creado con éxito!",
    statusCode: 201,
    nuevoUsuario,
  };
};

export const putUsuarioService = async (idUsuario, usuarioData) => {
  // Busca al usuario por su id
  const usuario = await UserModel.findById(idUsuario);

  // Si se envía una nueva foto de perfil
  if (usuarioData.fotoPerfil) {
    // Verifica si la foto no está ya en el array fotosPerfil
    if (!usuarioData.fotosPerfil.includes(usuarioData.fotoPerfil)) {
      // Agrega la nueva foto al array fotosPerfil
      usuarioData.fotosPerfil.push(usuarioData.fotoPerfil);
    }
  }

  // Actualiza el resto de la información del usuario
  Object.assign(usuario, usuarioData);

  // Guarda los cambios
  const usuarioActualizado = await usuario.save();

  return {
    mensaje: "Usuario actualizado",
    usuario: usuarioActualizado,
    statusCode: 200,
  };
};


/* export const putUsuarioService = async (idUsuario, usuarioData) => {
  const usuarioActualizado = await UserModel.findOneAndUpdate(
    { _id: idUsuario },
    usuarioData
  );

  return {
    mensaje: "Usuario actualizado",
    usuario: usuarioActualizado,
    statusCode: 200,
  };
}; */

export const deleteUsuarioService = async (idUsuario) => {
  await UserModel.findByIdAndDelete({ _id: idUsuario });

  return {
    mensaje: "Usuario eliminado",
    statusCode: 200,
  };
};



export const agregarFotoPerfilService = async (idUsuario, file) => {
  const usuario = await UserModel.findById(idUsuario);
  const imagen = await cloudinary.uploader.upload(file.path);
  usuario.fotoPerfil = imagen.secure_url;
  if (!usuario.fotosPerfil.includes(imagen.secure_url)) {
    usuario.fotosPerfil.push(imagen.secure_url);
  }

  await usuario.save();

  return {
    msg: 'Foto de perfil cargada',
    statusCode: 200,
  }
};