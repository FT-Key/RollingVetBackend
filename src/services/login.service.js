import fetch from "node-fetch";
import { getUsuariosService, putUsuarioService } from "./usuarios.service.js";
import { generateJwtToken, verifyPassword } from "../utils/login.utils.js";
import UserModel from "../models/usuario.schema.js";

export async function loginService(userData) {
  const { nombreDeUsuario, contraseniaDeUsuario, recordarme } = userData;

  try {
    const usuarioEncontrado = await UserModel.findOne({ nombreUsuario: nombreDeUsuario }).select('+contrasenia');

    if (!usuarioEncontrado) {
      return { statusCode: 404, msg: "Usuario no encontrado" };
    }

    if (usuarioEncontrado.bloqueado) {
      return { statusCode: 403, msg: "El usuario está bloqueado" };
    }

    if (usuarioEncontrado.tipoRegistro !== "normal") {
      return { statusCode: 400, msg: "Error al iniciar sesión, tipo de registro inválido" };
    }

    const contraseniaCoincide = await verifyPassword(contraseniaDeUsuario, usuarioEncontrado.contrasenia);

    if (!contraseniaCoincide) {
      return { statusCode: 400, msg: "Contraseña incorrecta" };
    }

    const usuarioData = {
      estaActivo: true,
      ultimoIngreso: new Date(),
    };

    const actualizacion = await putUsuarioService(usuarioEncontrado._id, usuarioData);

    if (!actualizacion.usuario) {
      return { statusCode: 500, msg: "Error al actualizar el usuario" };
    }

    const token = generateJwtToken(usuarioEncontrado);

    return {
      statusCode: 200,
      token,
      msg: "Inicio de sesión exitoso!",
    };
  } catch (error) {
    console.error("Error en loginService:", error);
    return { statusCode: 500, msg: "Error en el servidor" };
  }
}

export async function googleLoginService(token) {
  try {
    // Verificar el token con Google
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`, // Usa el accessToken para esta llamada
      },
    });

    const userInfo = await response.json();

    if (userInfo.error) {
      return { statusCode: 400, msg: "Token inválido" };
    }

    // Buscar el usuario en la base de datos por el email
    const usuarioEncontrado = await UserModel.findOne({ email: userInfo.email })
      .select('+contrasenia')
      .populate('mascotas');
    // Realiza el populate de las mascotas
    // Selecciona la contraseña aunque esté marcada con select: false

    if (!usuarioEncontrado) {
      return { statusCode: 404, msg: "UsuarioEncontrado no encontrado" };
    }

    // Verificar si el usuario está bloqueado
    if (usuarioEncontrado.bloqueado) {
      return { statusCode: 403, msg: "El usuario está bloqueado" };
    }

    // Verificar que el tipo de registro sea "google"
    if (usuarioEncontrado.tipoRegistro !== "google") {
      return { statusCode: 400, msg: "Error al iniciar sesión, tipo de registro inválido" };
    }

    // Verificar la contraseña
    const userSubString = String(userInfo.sub).trim();
    const userFoundString = String(usuarioEncontrado.contrasenia).trim();
    const contraseñaCoincide = await verifyPassword(
      userSubString,
      userFoundString
    );

    if (!contraseñaCoincide) {
      return { statusCode: 401, msg: "Contraseña incorrecta" };
    }

    // Actualizar el estado de estaActivo a true usando putUsuarioService
    const usuarioData = {
      estaActivo: true,
      ultimoIngreso: new Date(), // También actualiza la fecha de último ingreso
    };

    const actualizacion = await putUsuarioService(
      usuarioEncontrado._id,
      usuarioData
    );

    if (!actualizacion.usuario) {
      return { statusCode: 500, msg: "Error al actualizar el usuario" };
    }

    // Emitir una sesión o token JWT
    const jwtToken = generateJwtToken(usuarioEncontrado);

    return {
      statusCode: 200,
      token: jwtToken,
      msg: "Inicio de sesión exitoso!",
    };
  } catch (error) {
    console.error("Error en googleLoginService", error);
    return { statusCode: 500, msg: "Error al verificar el token" };
  }
}

export async function closeLoginService(user) {
  try {
    // Busca y actualiza al usuario en una sola operación
    const usuarioActualizado = await UserModel.findByIdAndUpdate(
      user._id,
      { login: false }, // Actualiza solo el campo 'login'
      { new: true } // Devuelve el usuario actualizado
    );

    // Verifica si el usuario fue encontrado
    if (!usuarioActualizado) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    return {
      msg: "Se cerró la sesión",
      usuario: usuarioActualizado,
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al cerrar la sesión",
      error: error.msg,
      statusCode: 500,
    };
  }
}