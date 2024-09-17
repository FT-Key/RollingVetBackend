import { crearTurnosSemanalesService, obtenerTurnoService, obtenerTodosLosTurnosService, solicitarTurnoService, listaTurnosService, cancelarTurnoService, modificarTurnoService } from "../services/turnos.service.js";
/* import { crearTurnoService, obtenerTurnosService } from "../services/turnos.service.js"; */

/* export const obtenerTurnosController = async (req, res) => {
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
} */

export const obtenerTurnosController = async (req, res) => {
  try {
    const { fecha } = req.params;

    if (fecha) {
      // Obtener turnos para una fecha específica
      const turnos = await obtenerTurnoService(fecha, req.user);
      if (!turnos) {
        return res.status(404).json({ message: 'No se encontraron turnos para la fecha especificada.' });
      }
      return res.status(200).json(turnos);
    } else {
      // Obtener todos los turnos con paginación
      const result = await obtenerTodosLosTurnosService(req.pagination);  // Pasar paginación al servicio
      return res.status(200).json({
        fechaTurnos: result.fechaTurnos,
        totalTurnos: result.totalTurnos,
        page: req.pagination ? req.pagination.page : null,
        limit: req.pagination ? req.pagination.limit : null
      });
    }
  } catch (error) {
    const statusCode = error.message === 'Ya tienes un turno reservado para este día.' ? 400 : 500;
    return res.status(statusCode).json({ message: error.message || 'Error al obtener los turnos.' });
  }
};

export const listaTurnosController = async (req, res) => {
  try {
    // Obtener el ID del usuario desde el token o la solicitud
    const userId = req.user._id; // Asegúrate de que el ID del usuario esté disponible en req.user

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
    }

    // Llamar al servicio para obtener los turnos del usuario
    const turnos = await listaTurnosService(userId);

    // Si el valor es null, undefined o no es un array, es un error
    if (!Array.isArray(turnos)) {
      return res.status(500).json({ message: 'Error al obtener los turnos del usuario.' });
    }

    // Si es un array vacío, no es un error
    if (turnos.length === 0) {
      return res.status(200).json({ message: 'No tiene turnos.' });
    }

    // Enviar la respuesta con los turnos
    res.status(200).json(turnos);
  } catch (error) {
    console.error('Error al obtener los turnos del usuario:', error);
    res.status(500).json({ message: 'Error al obtener los turnos del usuario.' });
  }
};

export const crearTurnosSemanalesController = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado (admin que está creando los turnos)
    const creadorId = req.user._id;

    // Delegar la creación de turnos semanales al servicio
    await crearTurnosSemanalesService(creadorId);

    res.status(201).json({ message: 'Turnos semanales creados con éxito' });
  } catch (error) {
    console.error('Error al crear los turnos semanales:', error);
    res.status(500).json({ message: 'Error al crear los turnos semanales' });
  }
};

export const solicitarTurnoController = async (req, res) => {
  try {
    // Obtener los datos de la solicitud: fecha, hora, tipoAtencion y descripcion
    const { fecha, hora, tipoAtencion, descripcion } = req.body;

    // Verificar que los datos necesarios se proporcionen
    if (!fecha || !hora || !tipoAtencion) {
      return res.status(400).json({ message: 'La fecha, hora y tipo de atención son requeridos.' });
    }

    // Obtener el ID del usuario autenticado (cliente que solicita el turno)
    const usuarioId = req.user._id;

    // Llamar al servicio para solicitar el turno
    const turnoSolicitado = await solicitarTurnoService(fecha, hora, usuarioId, tipoAtencion, descripcion);

    // Verificar si el servicio devolvió un error (ya tiene turno)
    if (turnoSolicitado?.error) {
      return res.status(400).json({ message: turnoSolicitado.error });
    }

    // Verificar si el turno fue solicitado con éxito
    if (turnoSolicitado) {
      return res.status(200).json({ message: 'Turno solicitado con éxito', turno: turnoSolicitado });
    } else {
      return res.status(400).json({ message: 'El turno ya está ocupado o no se encontró.' });
    }
  } catch (error) {
    console.error('Error al solicitar el turno:', error);
    res.status(500).json({ message: 'Error al solicitar el turno.' });
  }
};

export const cancelarTurnoController = async (req, res) => {
  try {
    const { turnoId } = req.body;  // Asegúrate de que el ID del turno se envíe desde el frontend
    if (!turnoId) {
      return res.status(400).json({ error: 'ID de turno requerido.' });
    }

    // Llama al servicio para cancelar el turno
    const turnoCancelado = await cancelarTurnoService(turnoId, req.user);

    if (!turnoCancelado) {
      return res.status(404).json({ error: 'Turno no encontrado o no se pudo cancelar.' });
    }

    return res.status(200).json({ message: 'Turno cancelado correctamente.', turno: turnoCancelado });
  } catch (error) {
    return res.status(500).json({ error: 'Error al cancelar el turno.' });
  }
};

export const modificarTurnoController = async (req, res) => {
  try {
    const { turnoId } = req.params; // Obtener el turnoId de los parámetros
    const actualizaciones = req.body; // Obtener las actualizaciones del body

    // Validar los datos de entrada
    if (!turnoId || !actualizaciones) {
      return res.status(400).json({ error: 'Faltan datos necesarios en la solicitud' });
    }

    // Llamar al servicio para modificar el turno
    const fechaTurnoActualizada = await modificarTurnoService(turnoId, actualizaciones);

    // Enviar la respuesta con los datos actualizados
    res.status(200).json(fechaTurnoActualizada);
  } catch (error) {
    // Manejar errores
    res.status(500).json({ error: error.message });
  }
};