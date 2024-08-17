import { Router } from 'express';
import { getUsuariosService, postUsuarioService } from './usuarios.service.js';
import bcrypt from 'bcrypt';

const router = Router();

// Función para encriptar una contraseña
const encryptPassword = async (password) => {
  try {
    const saltRounds = 10; // Número de rondas de salt
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashear la contraseña
    return hashedPassword;
  } catch (error) {
    throw new Error('Error al encriptar la contraseña');
  }
};

export async function registerService(userData) {
  try {
    const { nombreDeUsuario, emailDeUsuario, contraseniaDeUsuario, confContraseniaDeUsuario } = userData;

    if (confContraseniaDeUsuario !== contraseniaDeUsuario) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const usuariosResult = await getUsuariosService();
    const usuarios = usuariosResult.usuarios;

    const nombreUsuarioEncontrado = usuarios.some(u => u.nombreUsuario === nombreDeUsuario);
    if (nombreUsuarioEncontrado) {
      return res.status(400).json({ error: 'Ya existe un usuario registrado con ese nombre de usuario' });
    }

    const emailUsuarioEncontrado = usuarios.some(u => u.email === emailDeUsuario);
    if (emailUsuarioEncontrado) {
      return res.status(400).json({ error: 'Ya existe un usuario registrado con ese email' });
    }

    const nuevaId = usuarios[usuarios.length - 1].id + 1 || 1;

    const nuevoUsuarioData = {
      id: nuevaId,
      nombreUsuario: nombreDeUsuario,
      email: emailDeUsuario,
      contrasenia: contraseniaDeUsuario,
      rol: 'cliente',
      actualizadoEn: Date.now,
    };

    const response = await postUsuarioService(nuevoUsuarioData);

    return res.status(response.statusCode).json({ msg: response.mensaje, nuevoUsuario: response.nuevoUsuario });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    return res.status(500).json({ error: 'Error en el servidor al crear usuario' });
  }
};

export async function googleRegisterService(userData) {

};

export default router;