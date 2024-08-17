import { googleLoginService, loginService } from '../services/login.service.js';

export const postRegister = async (req, res) => {
  try {
    const usuarioData = req.body;
    let result;
    if (usuarioData.contrasenia) {
      result = await registerService(usuarioData);
    } else {
      result = await googleRegisterService(usuarioData);
    }
    return res.status(result.statusCode).json({ msg: result.mensaje, nuevoUsuario: result.nuevoUsuario });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};