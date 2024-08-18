import { Router } from "express";
import fetch from "node-fetch";
import { getUsuariosService, putUsuarioService } from "./usuarios.service.js";
import { generateJwtToken, verifyPassword } from "../utils/login.utils.js";

const router = Router();

export async function loginService(userData) {
  const { nombreDeUsuario, contraseniaDeUsuario } = userData;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuarios = await getUsuariosService();

    const usuarioEncontrado = usuarios.find(
      (u) => u.nombreUsuario === nombreDeUsuario
    );

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

export async function googleLoginService(req, res) {
  const { token } = req.body;

  try {
    // Verificar el token con Google
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const userInfo = await response.json();

    if (userInfo.error) {
      return res.status(400).json({ error: "Token inválido" });
    }

    const usuarios = await getUsuariosService();

    const usuarioEncontrado = usuarios.find((u) => u.email === userInfo.email);

    if (!usuarioEncontrado) {
      return res.status(404).json({ error: "UsuarioEncontrado no encontrado" });
    }

    // Verificar la contraseña
    const contraseñaCoincide = await verifyPassword(
      userInfo.sub,
      usuarioEncontrado.contrasenia
    );

    if (!contraseñaCoincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
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

    // Emitir una sesión o token JWT
    const jwtToken = generateJwtToken(usuarioEncontrado);

    return res.json({ token: jwtToken });
  } catch (error) {
    console.error("Error en googleLoginService", error);
    return res.status(500).json({ error: "Error al verificar el token" });
  }
}

export default router;
