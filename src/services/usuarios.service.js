import UserModel from "../models/usuario.schema.js";
import CartModel from "../models/carrito.schema.js";
import FavModel from "../models/favoritos.schema.js";

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

import bcrypt from "bcrypt";

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
  const usuarioActualizado = await UserModel.findOneAndUpdate(
    { _id: idUsuario },
    usuarioData
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
