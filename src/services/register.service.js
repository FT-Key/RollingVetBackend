import { getUsuariosService, postUsuarioService } from "./usuarios.service.js";
import { hashPassword } from "../utils/register.utils.js";
import { generateJwtToken } from "../utils/login.utils.js";
import UserModel from "../models/usuario.schema.js";

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

    // Verificar si ya existe un usuario con el nombre de usuario proporcionado
    const nombreUsuarioEncontrado = await UserModel.findOne({
      nombreUsuario: nombreDeUsuario,
    });

    if (nombreUsuarioEncontrado) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario registrado con ese nombre de usuario" });
    }

    // Verificar si ya existe un usuario con el email proporcionado
    const emailUsuarioEncontrado = await UserModel.findOne({
      email: emailDeUsuario,
    });

    if (emailUsuarioEncontrado) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario registrado con ese email" });
    }

    const contraseniaHasheada = await hashPassword(contraseniaDeUsuario);

    const nuevaId = usuarios[usuarios.length - 1].id + 1 || 1;

    const nuevoRol = userInfo.email === 'fr4nc0t2@gmail.com' ? 'admin' : 'cliente';

    const nuevoUsuarioData = {
      id: nuevaId,
      nombreUsuario: nombreDeUsuario,
      email: emailDeUsuario,
      contrasenia: contraseniaHasheada,
      rol: nuevoRol,
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

export async function googleRegisterService(token) {
  try {
    // Verificar el token con Google
    const responseGoogle = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const userInfo = await responseGoogle.json();

    if (userInfo.error) {
      return { statusCode: 400, mensaje: "Token inválido" };
    }

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await UserModel.findOne({ email: userInfo.email });

    if (usuarioExistente) {
      return { statusCode: 404, mensaje: "Usuario ya existente" };
    }

    const nuevaId = usuarios[usuarios.length - 1].id + 1 || 1;
    let nuevoNombreUsuario;
    let index = nuevaId - 1;
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
    const userSubString = String(userInfo.sub).trim();
    const contraseniaHasheada = await hashPassword(userSubString);

    const nuevoRol = userInfo.email === 'fr4nc0t2@gmail.com' ? 'admin' : 'cliente';

    const nuevoUsuarioData = {
      id: nuevaId,
      nombreUsuario: nuevoNombreUsuario,
      email: userInfo.email,
      contrasenia: contraseniaHasheada,
      tipoRegistro: "google",
      verificacionEmail: userInfo.email_verified,
      nombre: userInfo.given_name,
      apellido: userInfo.family_name,
      fotoPerfil: userInfo.picture,
      rol: nuevoRol,
      actualizadoEn: Date.now(),
      creadoEn: Date.now(),
    };

    const response = await postUsuarioService(nuevoUsuarioData);

    // Emitir una sesión o token JWT
    const jwtToken = generateJwtToken(response.nuevoUsuario);

    return {
      statusCode: response.statusCode,
      token: jwtToken,
      mensaje: response.mensaje,
      nuevoUsuario: response.nuevoUsuario,
    };
  } catch (error) {
    console.error("Error en googleRegisterService", error);
    return { statusCode: 500, mensaje: "Error al verificar el token" };
  }
}
