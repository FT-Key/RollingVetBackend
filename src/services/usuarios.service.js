import UserModel from "../models/usuario.schema.js";
import CartModel from "../models/carrito.schema.js";
import FavModel from "../models/favoritos.schema.js";
import AnimalModel from "../models/animal.schema.js";
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
  const usuario = await UserModel.findById(idUsuario).populate('mascotas');

  // Si se envía una nueva foto de perfil
  if (usuarioData.fotoPerfil) {
    if (!usuario.fotosPerfil.includes(usuarioData.fotoPerfil)) {
      usuario.fotosPerfil.push(usuarioData.fotoPerfil);
    }
  }

  // Verificar si se envía el array de mascotas desde el frontend
  if (usuarioData.mascotas && usuarioData.mascotas.length > 0) {
    // Recorrer las mascotas enviadas desde el frontend
    for (let mascotaFrontend of usuarioData.mascotas) {
      // Verificar si ya existe una mascota en el array del usuario con el mismo nombre y tipo (puedes cambiar esto por otras validaciones más precisas)
      const mascotaExiste = usuario.mascotas.some(mascotaDB =>
        mascotaDB.nombre === mascotaFrontend.nombre && mascotaDB.tipo === mascotaFrontend.tipo
      );

      if (!mascotaExiste) {
        // Si la mascota no existe, crear una nueva instancia de Animal
        const nuevaMascota = new AnimalModel({
          dueño: usuario._id, // El dueño es el usuario actual
          tipo: mascotaFrontend.tipo,
          raza: mascotaFrontend.raza,
          nombre: mascotaFrontend.nombre,
          edad: mascotaFrontend.edad,
          estado: "Mascota" // Asumimos que es una mascota
        });

        // Guardar la nueva mascota en la colección de animales
        const mascotaGuardada = await nuevaMascota.save();

        // Agregar la referencia de la nueva mascota al array de mascotas del usuario
        usuario.mascotas.push(mascotaGuardada._id);
      }
    }
  }

  // Actualizar el resto de la información del usuario
  Object.assign(usuario, usuarioData);

  // Guardar los cambios del usuario
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