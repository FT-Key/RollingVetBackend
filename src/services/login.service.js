import { Router } from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { getUsuariosService } from './usuarios.service.js';
import bcrypt from 'bcrypt';

const router = Router();

// Función para generar un Token
const generateJwtToken = (userInfo) => {
  const payload = {
    _id: userInfo._id,
    id: userInfo.id,
    nombreUsuario: userInfo.nombreUsuario,
    email: userInfo.email,
    rol: userInfo.rol,
    nombre: userInfo.nombre || '',
    apellido: userInfo.apellido || '',
    fotoPerfil: userInfo.fotoPerfil || '',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Función para verificar una contraseña
const verifyPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword); // Comparar la contraseña
    return isMatch;
  } catch (error) {
    throw new Error('Error al verificar la contraseña');
  }
};

export async function loginService(userData) {
  const { nombreDeUsuario, contraseniaDeUsuario } = userData;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuarios = await getUsuariosService();

    const usuarioEncontrado = usuarios.find(u => u.nombreUsuario === nombreDeUsuario);

    if (!usuarioEncontrado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const contraseniaCoincide = await verifyPassword(contraseniaDeUsuario, usuarioEncontrado.contrasenia);
    if (!contraseniaCoincide) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token de autenticación
    const token = generateJwtToken(usuarioEncontrado);

    // Enviar el token al cliente
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export async function googleLoginService(userData) {
  const { token } = req.body;

  try {
    // Verificar el token con Google
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const userInfo = await response.json();

    if (userInfo.error) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    const usuarios = await getUsuariosService();

    const usuario = usuarios.find(u => u.email === userInfo.email);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Emitir una sesión o token JWT
    const jwtToken = generateJwtToken(usuario);

    res.json({ token: jwtToken });

  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el token' });
  }
};

export default router;