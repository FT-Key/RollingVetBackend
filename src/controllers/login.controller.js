import { googleLoginService, loginService } from "../services/login.service.js";

export const postLogin = async (req, res) => {
  try {
    const usuarioData = req.body;
    let result;
    if (usuarioData.contrasenia) {
      result = await loginService(usuarioData);
    } else {
      result = await googleLoginService(usuarioData);
    }
    return res
      .status(result.statusCode)
      .json({ msg: result.mensaje, nuevoUsuario: result.nuevoUsuario });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};
