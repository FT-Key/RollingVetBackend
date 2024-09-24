// import TurnoModel from "../models/turnos.schema.js";
import FechaTurnoModel from "../models/fechaTurnos.schema.js";
import { normalizeDate, obtenerFechasDeSemana, HORAS_TURNOS, verificarHoraEnRango, ordenarTurnosPorHora } from "../utils/date.utils.js";
import moment from 'moment-timezone';
import { MercadoPagoConfig, Preference } from "mercadopago";

/* export const obtenerTurnoService = async (pagination = null) => {
  try {
    // Obtener el número total de turnos
    let totalTurnos = await FechaTurnoModel.countDocuments();

    // Calcular skip y limit si la paginación existe
    let fechasTurno;
    if (pagination) {
      const { skip, limit } = pagination;
      fechasTurno = await FechaTurnoModel.find()
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'turnos.usuario', // Hacer populate del usuario dentro de cada turno
          select: 'nombre email',
        });
    } else {
      // Si no hay paginación, traer todos los turnos
      fechasTurno = await FechaTurnoModel.find().populate({
        path: 'turnos.usuario',
        select: 'nombre email',
      });
    }

    // Llamar a la función para actualizar los turnos que ya pasaron
    await actualizarTurnosNoAsistidos(fechasTurno);

    // Mapear los turnos con los usuarios poblados
    const turnosConUsuarios = fechasTurno.map(turno => ({
      ...turno._doc,
      usuario: turno.usuario ? turno.usuario : null
    }));

    // Devolver los turnos y el total de turnos
    return {
      fechaTurnos: turnosConUsuarios,
      totalTurnos,
      statusCode: 200,
    };
  } catch (error) {
    throw new Error(error.message || 'Error al obtener todos los turnos');
  }
};

export const obtenerTurnoService = async (fecha, user) => {
  try {
    // Normalizar la fecha
    const fechaNormalizada = normalizeDate(fecha);

    // Buscar el documento FechaTurno por la fecha normalizada
    const fechaTurno = await FechaTurnoModel.findOne({ fecha: fechaNormalizada })
      .populate('creador', 'nombre')
      .populate({
        path: 'turnos', // Nombre del campo en FechaTurno que contiene los turnos
        populate: {
          path: 'usuario', // Nombre del campo en Turno que referencia al Usuario
          select: 'nombre email' // Campos del usuario que deseas obtener
        }
      });

    // Si no existe la fecha, retornar null
    if (!fechaTurno) return null;

    // Envolver fechaTurno en un array y llamar a la función para actualizar los turnos que ya pasaron
    await actualizarTurnosNoAsistidos([fechaTurno]);

    // Verificar si el usuario ya tiene un turno para ese día
    const turnoExistente = fechaTurno.turnos.find(turno =>
      turno.usuario?.toString() === user._id &&
      (turno.estado === 'pendiente' || turno.estado === 'confirmado' || turno.estado === 'libre')
    );

    if (turnoExistente && user.rol != 'admin') {
      // El usuario ya tiene un turno para ese día
      throw new Error('Ya tienes un turno reservado para este día.');
    }

    // Devolver los turnos si la fecha existe y el usuario no tiene un turno reservado
    return fechaTurno;
  } catch (error) {
    // Lanza el error para que el controlador lo maneje
    throw new Error(error.message || 'Error al obtener los turnos');
  }
}; */

export const obtenerTurnosService = async (pagination = null, filters = {}, user) => {
  try {
    // Filtrar los turnos según los filtros dinámicos
    const query = { ...filters };

    // Normalizar la fecha si viene en los filtros
    if (query.fecha) {
      query.fecha = normalizeDate(query.fecha);
    }

    // Obtener el número total de turnos que coincidan con los filtros
    const totalTurnos = await FechaTurnoModel.countDocuments(query);

    // Calcular skip y limit si la paginación existe
    let fechasTurno;
    if (pagination) {
      const { skip, limit } = pagination;
      fechasTurno = await FechaTurnoModel.find(query)
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'turnos.usuario', // Hacer populate del usuario dentro de cada turno
          select: 'nombre email',
        });
    } else {
      // Si no hay paginación, aplicar solo los filtros
      fechasTurno = await FechaTurnoModel.find(query).populate({
        path: 'turnos.usuario',
        select: 'nombre email',
      });
    }

    // Actualizar turnos que ya pasaron
    await actualizarTurnosNoAsistidos(fechasTurno);

    // Verificar si el usuario ya tiene un turno reservado para algún día en caso de que no sea admin
    if (user.rol !== 'admin') {
      fechasTurno.forEach(fechaTurno => {
        const turnoExistente = fechaTurno.turnos.find(turno =>
          turno.usuario?._id.toString() === user._id.toString() &&
          (turno.estado === 'pendiente' || turno.estado === 'confirmado' || turno.estado === 'libre')
        );

        if (turnoExistente) {
          throw new Error('Ya tienes un turno reservado para este día.');
        }
      });
    }

    // Devolver los turnos y el total
    return {
      fechaTurnos: fechasTurno,
      totalTurnos,
      statusCode: 200,
    };
  } catch (error) {
    throw new Error(error.message || 'Error al obtener los turnos');
  }
};

export const obtenerTurnoService = async (fecha, user) => {
  try {
    // Normalizar la fecha
    const fechaNormalizada = normalizeDate(fecha);

    // Buscar el documento FechaTurno por la fecha normalizada
    const fechaTurno = await FechaTurnoModel.findOne({ fecha: fechaNormalizada })
      .populate('creador', 'nombre')
      .populate({
        path: 'turnos', // Nombre del campo en FechaTurno que contiene los turnos
        populate: {
          path: 'usuario', // Nombre del campo en Turno que referencia al Usuario
          select: 'nombre email' // Campos del usuario que deseas obtener
        }
      });

    // Si no existe la fecha, retornar null
    if (!fechaTurno) return null;

    // Envolver fechaTurno en un array y llamar a la función para actualizar los turnos que ya pasaron
    await actualizarTurnosNoAsistidos([fechaTurno]);

    // Verificar si el usuario ya tiene un turno para ese día
    const turnoExistente = fechaTurno.turnos.find(turno =>
      turno.usuario?.toString() === user._id &&
      (turno.estado === 'pendiente' || turno.estado === 'confirmado' || turno.estado === 'libre')
    );

    if (turnoExistente && user.rol != 'admin') {
      // El usuario ya tiene un turno para ese día
      throw new Error('Ya tienes un turno reservado para este día.');
    }

    // Devolver los turnos si la fecha existe y el usuario no tiene un turno reservado
    return fechaTurno;
  } catch (error) {
    // Lanza el error para que el controlador lo maneje
    throw new Error(error.message || 'Error al obtener los turnos');
  }
};

export const listaTurnosService = async (userId) => {
  try {
    // Obtener los documentos FechaTurno que tengan turnos asociados con el usuario
    const fechasTurnos = await FechaTurnoModel.find({
      'turnos.usuario': userId  // Filtrar las fechas que tienen turnos del usuario
    })
      .populate({
        path: 'turnos',
        populate: {
          path: 'usuario',
          select: 'nombre email'  // Seleccionar los campos que necesitas del usuario
        }
      });

    // Filtrar manualmente solo los turnos que pertenecen al usuario especificado
    const turnos = fechasTurnos.flatMap(fechaTurno =>
      fechaTurno.turnos
        .filter(turno => turno.usuario && turno.usuario._id.toString() === userId.toString())  // Filtrar los turnos que tienen el userId
        .map(turno => ({
          ...turno.toObject(),  // Convertimos el turno a un objeto plano
          fecha: fechaTurno.fecha  // Añadimos la fecha del documento FechaTurno
        }))
    );

    return turnos;
  } catch (error) {
    console.error('Error en listaTurnosService:', error);
    throw new Error('Error al obtener los turnos del usuario');
  }
};

export const crearTurnosParaFecha = async (fecha, creadorId) => {
  const timezone = 'America/Argentina/Buenos_Aires'; // Zona horaria de Argentina
  const ahora = moment.tz(timezone); // Hora actual en Argentina
  const fechaActual = moment.tz(fecha, timezone); // Fecha para los turnos en Argentina

  // Filtrar los turnos según la hora actual y el día
  const turnosFiltrados = HORAS_TURNOS.filter(horaTurno => {
    const turnoMoment = moment.tz(`${fechaActual.format('YYYY-MM-DD')} ${horaTurno}`, 'YYYY-MM-DD HH:mm', timezone);

    // Si el turno es para hoy, verificar que falten al menos 30 minutos
    if (fechaActual.isSame(ahora, 'day')) {
      const diferenciaMinutos = turnoMoment.diff(ahora, 'minutes');
      return diferenciaMinutos >= 30; // Solo incluir turnos con más de 30 minutos de diferencia
    }
    // Si no es hoy, incluir todos los turnos
    return true;
  }).map(hora => ({
    hora,
    tipoAtencion: 'Consulta de producto',  // Puedes modificar este valor según lo necesites
  }));

  // Guardar los turnos filtrados
  if (turnosFiltrados.length > 0) {
    const nuevaFechaTurno = new FechaTurnoModel({
      fecha: fechaActual.toDate(), // Guardar la fecha con la zona horaria
      creador: creadorId,
      turnos: turnosFiltrados
    });

    try {
      await nuevaFechaTurno.save();
      console.log('Turnos creados para la fecha:', fecha);
    } catch (error) {
      console.error('Error al crear los turnos para la fecha:', error);
      throw new Error('Error al crear los turnos');
    }
  } else {
    console.log(`No se generaron turnos para la fecha: ${fecha} debido a las restricciones de tiempo.`);
  }
};

export const crearTurnosSemanalesService = async (creadorId) => {
  try {
    // Generar las fechas de lunes a sábado de la semana actual (excluyendo domingo)
    const fechasSemana = obtenerFechasDeSemana();
    console.log("FECHAS: ", fechasSemana);

    // Crear turnos para cada fecha de la semana, excepto domingo
    for (const fecha of fechasSemana) {
      try {
        console.log("Se crea turno para: ", fecha);
        await crearTurnosParaFecha(fecha, creadorId);
      } catch (error) {
        // Manejar el error de duplicidad de clave única (turnos ya existentes para la fecha)
        if (error.message.includes('E11000')) {
          console.log(`Ya existen turnos para la fecha: ${fecha}, se omite la creación de turnos.`);
        } else {
          // Si es otro error, lanzarlo
          console.error(`Error al crear turnos para la fecha ${fecha}:`, error);
          throw error;
        }
      }
    }

    console.log('Turnos semanales creados exitosamente');
  } catch (error) {
    console.error('Error en la creación de turnos semanales:', error);
    throw new Error('Error en la creación de turnos semanales');
  }
};

export const solicitarTurnoService = async (fecha, hora, usuarioId, tipoAtencion, descripcion) => {
  const timezone = 'America/Argentina/Buenos_Aires'; // Zona horaria de Argentina
  try {
    // Normalizar la fecha con la zona horaria de Argentina
    const fechaNormalizada = normalizeDate(moment.tz(fecha, timezone).format('YYYY-MM-DD'));

    const fechaTurno = await FechaTurnoModel.findOne({ fecha: fechaNormalizada });

    if (!fechaTurno) {
      throw new Error('No se encontró la fecha especificada.');
    }

    // Verificar si el usuario ya tiene un turno para esa fecha
    const yaPoseeTurno = fechaTurno.turnos.some(turno => turno.usuario?.equals(usuarioId) && turno.estado != 'cancelado');

    if (yaPoseeTurno) {
      return { error: 'Ya tienes un turno reservado para esta fecha.' }; // Retorna un mensaje de error si ya tiene un turno
    }

    // Buscar el turno dentro de los turnos de esa fecha
    const turno = fechaTurno.turnos.find(t => t.hora === hora);

    if (!turno) {
      throw new Error('No se encontró el turno especificado.');
    }

    // Verificar si el turno está libre
    if (!['libre'].includes(turno.estado)) {
      return null; // El turno ya está ocupado
    }

    // Asignar el turno al usuario, agregar tipoAtencion y descripcion, y cambiar el estado a 'pendiente'
    turno.usuario = usuarioId;
    turno.tipoAtencion = tipoAtencion;
    turno.descripcion = descripcion || '';  // Si no se proporciona una descripción, deja el campo vacío
    turno.estado = 'pendiente';

    // Guardar los cambios en la base de datos
    await fechaTurno.save();

    return turno;
  } catch (error) {
    console.error('Error en solicitarTurnoService:', error);
    throw new Error('Error al solicitar el turno');
  }
};

export const cancelarTurnoService = async (turnoId, user) => {
  try {
    let turnoCancelado;

    if (user.rol === 'cliente') {
      // Verificar que el turno le pertenezca al cliente
      turnoCancelado = await FechaTurnoModel.findOneAndUpdate(
        { 'turnos._id': turnoId, 'turnos.usuario': user._id },  // El turno debe estar asociado al usuario
        { $set: { 'turnos.$.estado': 'cancelado' } },  // Actualiza el estado del turno
        { new: true }  // Retorna el documento actualizado
      );

      if (!turnoCancelado) {
        throw new Error('No tienes permiso para cancelar este turno o no existe.');
      }
    } else if (user.rol === 'admin') {
      // Busca el turno por su ID y actualiza su estado a 'cancelado'
      turnoCancelado = await FechaTurnoModel.findOneAndUpdate(
        { 'turnos._id': turnoId },
        { $set: { 'turnos.$.estado': 'cancelado' } },
        { new: true }
      );
    }

    // Obtener el turno cancelado para duplicarlo
    const turnoOriginal = turnoCancelado.turnos.find(turno => turno._id.toString() === turnoId);

    if (!turnoOriginal) {
      throw new Error('El turno no se encontró.');
    }

    // Crear un nuevo turno con estado "libre", usuario "null", y otros valores restablecidos
    const nuevoTurno = {
      hora: turnoOriginal.hora,  // Mantén la hora del turno original
      tipoAtencion: 'Consulta de producto',  // Valor por defecto
      estado: 'libre',  // Estado libre
      modalidad: 'online',  // Modalidad por defecto
      usuario: null,  // Usuario en null
      descripcion: '',  // Descripción vacía
    };

    // Actualizar el documento agregando el nuevo turno
    const fechaTurnoActualizada = await FechaTurnoModel.findOneAndUpdate(
      { _id: turnoCancelado._id },  // Buscar el documento de la fecha
      { $push: { turnos: nuevoTurno } },  // Añadir el nuevo turno al array
      { new: true }  // Retorna el documento actualizado
    );

    // Ordenar los turnos por hora antes de guardar en la base de datos
    ordenarTurnosPorHora(fechaTurnoActualizada);

    // Guardar el documento con los turnos ordenados
    await fechaTurnoActualizada.save();

    return fechaTurnoActualizada;
  } catch (error) {
    throw new Error('No se pudo cancelar el turno.');
  }
};

export const modificarTurnoService = async (turnoId, actualizaciones) => {
  try {
    // Buscar el documento de FechaTurno que contiene el turno
    const fechaTurno = await FechaTurnoModel.findOne({ 'turnos._id': turnoId });

    if (!fechaTurno) {
      throw new Error('Turno no encontrado');
    }

    // Buscar el turno dentro del array de turnos
    const turno = fechaTurno.turnos.id(turnoId);

    if (!turno) {
      throw new Error('Turno no encontrado');
    }

    // Si se quiere completar el turno, realizar la verificación de la hora
    if (actualizaciones.estado === 'completado') {
      const esHoraValida = verificarHoraEnRango(turno.hora, true, 2); // Verifica que la hora sea mayor a la actual y esté dentro de 2 horas
      if (!esHoraValida) {
        throw new Error('El turno solo puede completarse si está dentro del rango de las 2 horas siguientes a la hora actual');
      }
    }

    // Actualizar los campos del turno con los valores proporcionados
    Object.assign(turno, actualizaciones);

    // Guardar los cambios
    await fechaTurno.save();

    return fechaTurno;
  } catch (error) {
    throw new Error(`Error al modificar el turno: ${error.message}`);
  }
};

// Funciones de ayuda

// Función que actualiza los turnos a "no asistido" si han pasado más de 2 horas y no están completados
export const actualizarTurnosNoAsistidos = async (fechasTurnos) => {
  try {
    const turnosActualizadosPromises = fechasTurnos.flatMap(fechaTurno =>
      fechaTurno.turnos.map(async turno => {
        const turnoHora = moment.tz(`${fechaTurno.fecha.toISOString().split('T')[0]} ${turno.hora}`, 'America/Argentina/Buenos_Aires');
        const horaActual = moment.tz('America/Argentina/Buenos_Aires');
        const diferenciaEnMinutos = horaActual.diff(turnoHora, 'minutes');

        // Si han pasado más de 2 horas (120 minutos)
        if (diferenciaEnMinutos >= 120 && turno.usuario && ['pendiente', 'confirmado'].includes(turno.estado)) {
          // Si el turno tiene usuario y no está completado, cambiar a 'no asistido'
          turno.estado = 'no asistido';
          await FechaTurnoModel.findOneAndUpdate(
            { 'turnos._id': turno._id },
            { $set: { 'turnos.$.estado': 'no asistido' } },
            { new: true }
          );
        }

        if (diferenciaEnMinutos >= 0 && !turno.usuario && turno.estado === 'libre') {
          // Si el turno no tiene usuario y está 'libre', cambiar a 'caducado'
          turno.estado = 'caducado';
          await FechaTurnoModel.findOneAndUpdate(
            { 'turnos._id': turno._id },
            { $set: { 'turnos.$.estado': 'caducado' } },
            { new: true }
          );
        }

        return turno.toObject(); // Retornar el turno para reutilizar si es necesario
      })
    );

    // Esperar a que todas las actualizaciones se completen
    await Promise.all(turnosActualizadosPromises);
  } catch (error) {
    console.error('Error en actualizarTurnosNoAsistidos:', error);
    throw new Error('Error al actualizar los turnos a "no asistido" o "caducado"');
  }
};