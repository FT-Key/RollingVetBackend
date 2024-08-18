import { Router } from "express";
import { getUsuariosService, postUsuarioService } from "./usuarios.service.js";
import { encryptPassword } from "../utils/register.utils.js";

const router = Router();

export async function registerService(userData) {
  try {
    const {
      nombreDeUsuario,
      emailDeUsuario,
      contraseniaDeUsuario,
      confContraseniaDeUsuario,
    } = userData;

    if (confContraseniaDeUsuario !== contraseniaDeUsuario) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    const usuariosResult = await getUsuariosService();
    const usuarios = usuariosResult.usuarios;

    const nombreUsuarioEncontrado = usuarios.some(
      (u) => u.nombreUsuario === nombreDeUsuario
    );
    if (nombreUsuarioEncontrado) {
      return res.status(400).json({
        error: "Ya existe un usuario registrado con ese nombre de usuario",
      });
    }

    const emailUsuarioEncontrado = usuarios.some(
      (u) => u.email === emailDeUsuario
    );
    if (emailUsuarioEncontrado) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario registrado con ese email" });
    }

    const contraseniaHasheada = await encryptPassword(contraseniaDeUsuario);

    const nuevaId = usuarios[usuarios.length - 1].id + 1 || 1;

    const nuevoUsuarioData = {
      id: nuevaId,
      nombreUsuario: nombreDeUsuario,
      email: emailDeUsuario,
      contrasenia: contraseniaHasheada,
      rol: "cliente",
      actualizadoEn: Date.now,
      creadoEn: Date.now,
    };

    const response = await postUsuarioService(nuevoUsuarioData);

    return res
      .status(response.statusCode)
      .json({ msg: response.mensaje, nuevoUsuario: response.nuevoUsuario });
  } catch (error) {
    console.error("Error en el registro de usuario:", error);
    return res
      .status(500)
      .json({ error: "Error en el servidor al crear usuario" });
  }
}

export async function googleRegisterService(req, res) {
  const { token } = req.body;

  try {
    // Verificar el token con Google
    const responseGoogle = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const userInfo = await responseGoogle.json();
    console.log("Informacion del usuario", userInfo);

    if (userInfo.error) {
      return res.status(400).json({ error: "Token inválido" });
    }

    const usuarios = await getUsuariosService();

    const usuario = usuarios.some((u) => u.email === userInfo.email);

    if (usuario) {
      return res.status(404).json({ error: "Usuario ya existente" });
    }

    const nuevaId = usuarios[usuarios.length - 1].id + 1 || 1;
    let nuevoNombreUsuario;
    let index = 0;
    let existeUsuario;

    while (true) {
      index++;
      nuevoNombreUsuario = `Usuario${index}`;
      existeUsuario = usuarios.some(
        (u) => u.nombreUsuario === nuevoNombreUsuario
      );

      if (!existeUsuario) {
        break; // Sale del bucle si no existe el nombre de usuario
      }
    }

    // Hashear la contraseña (userInfo.sub en este caso)
    const contraseniaHasheada = await encryptPassword(userInfo.sub);

    const nuevoUsuarioData = {
      id: nuevaId,
      nombreUsuario: nuevoNombreUsuario,
      email: userInfo.email,
      contrasenia: contraseniaHasheada,
      tipoRegistro: "google",
      verificacionEmail: userInfo.email_verified,
      nombre: userInfo.family_name,
      apellido: userInfo.given,
      fotoPerfil: userInfo.picture,
      rol: "cliente",
      actualizadoEn: Date.now(),
      creadoEn: Date.now(),
    };

    const response = await postUsuarioService(nuevoUsuarioData);

    return res
      .status(response.statusCode)
      .json({ msg: response.mensaje, nuevoUsuario: response.nuevoUsuario });
  } catch (error) {
    console.error("Error en googleRegisterService", error);
    return res.status(500).json({ error: "Error al verificar el token" });
  }
}

export default router;
