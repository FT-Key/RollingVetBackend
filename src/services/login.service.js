import { Router } from "express";
import fetch from "node-fetch";
import { getUsuariosService, putUsuarioService } from "./usuarios.service.js";
import { generateJwtToken, verifyPassword } from "../utils/login.utils.js";
import UserModel from "../models/usuario.schema.js";

export async function loginService(userData) {
  const { nombreDeUsuario, contraseniaDeUsuario } = userData;

  try {
    // Buscar el usuario en la base de datos por nombreDeUsuario
    const usuarioEncontrado = await UserModel.findOne({ nombreDeUsuario: nombreDeUsuario }).select('+contrasenia'); // Selecciona la contraseña aunque esté marcada con select: false

    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const contraseniaCoincide = await verifyPassword(
      contraseniaDeUsuario,
      usuarioEncontrado.contrasenia
    );
    if (!contraseniaCoincide) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
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
      return res
        .status(500)
        .json({ message: "Error al actualizar el usuario" });
    }

    // Generar un token de autenticación
    const token = generateJwtToken(usuarioEncontrado);

    // Enviar el token al cliente
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function googleLoginService(token) {
  try {
    // Verificar el token con Google
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const userInfo = await response.json();

    if (userInfo.error) {
      return { statusCode: 400, mensaje: "Token inválido" };
    }

    // Buscar el usuario en la base de datos por el email
    const usuarioEncontrado = await UserModel.findOne({ email: userInfo.email }).select('+contrasenia'); // Selecciona la contraseña aunque esté marcada con select: false
    
    if (!usuarioEncontrado) {
      return { statusCode: 404, mensaje: "UsuarioEncontrado no encontrado" };
    }

    // Verificar la contraseña
    const userSubString = String(userInfo.sub).trim();
    const userFoundString = String(usuarioEncontrado.contrasenia).trim();
    const contraseñaCoincide = await verifyPassword(
      userSubString,
      userFoundString
    );

    if (!contraseñaCoincide) {
      return { statusCode: 401, mensaje: "Contraseña incorrecta" };
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
      return { statusCode: 500, mensaje: "Error al actualizar el usuario" };
    }

    // Emitir una sesión o token JWT
    const jwtToken = generateJwtToken(usuarioEncontrado);

    return {
      statusCode: 200,
      token: jwtToken,
      mensaje: "Inicio de sesión exitoso!",
    };
  } catch (error) {
    console.error("Error en googleLoginService", error);
    return { statusCode: 500, mensaje: "Error al verificar el token" };
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
        mensaje: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    return {
      mensaje: "Se cerró la sesión",
      usuario: usuarioActualizado,
      statusCode: 200,
    };
  } catch (error) {
    return {
      mensaje: "Error al cerrar la sesión",
      error: error.message,
      statusCode: 500,
    };
  }
}