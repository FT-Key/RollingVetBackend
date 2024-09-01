import { crearTurnoService, obtenerTurnosService } from "../services/turnos.service.js";

export const obtenerTurnosController = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado del middleware
    const usuarioId = req.user._id;

    // Llamar al servicio con el ID del usuario
    const result = await obtenerTurnosService(usuarioId);
    
    if (result.statusCode === 200) {
      return res.status(200).json(result.turnos);
    } else {
      return res.status(500).json({ msg: "Error al traer los turnos." });
    }
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
}


export const crearTurnoController = async (req, res) => {
  try {
    const datosTurno = req.body;
    
    // Convertir el string de fecha a un objeto Date
    if (datosTurno.fecha) {
      datosTurno.fecha = new Date(datosTurno.fecha);
    }

    // Asegúrate de que el campo usuario se establezca a partir del usuario autenticado
    datosTurno.usuario = req.user._id;

    const result = await crearTurnoService(datosTurno);
    return res.status(result.statusCode).json({ msg: result.msg, nuevoTurno: result.nuevoTurno });
  } catch (error) {
    console.error("Error al crear el turno:", error);
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
}

export const crearTurnosSemanalesController = async (req, res) => {
  try {
    // Asegúrate de que el campo usuario se establezca a partir del usuario autenticado
    datosTurno.usuario = req.user._id;

  } catch (error) {
  }
}