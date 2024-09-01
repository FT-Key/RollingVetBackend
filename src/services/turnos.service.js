import TurnoModel from "../models/turnos.schema.js";

export const obtenerTurnosService = async (usuarioId) => {
  try {
    // Buscar los turnos que pertenecen al usuario autenticado
    const turnos = await TurnoModel.find({ usuario: usuarioId });
    return { statusCode: 200, turnos };
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    return { statusCode: 500, turnos: [], msg: "Error al obtener los turnos." };
  }
}

export const crearTurnoService = async (datosTurno) => {
  const nuevoTurno = new TurnoModel(datosTurno);

  try {
    await nuevoTurno.save();
    return { statusCode: 201, nuevoTurno, msg: 'Turno creado con éxito' };
  } catch (error) {
    console.error("Error al guardar el turno:", error);
    throw new Error("Error al guardar el turno");
  }
}

export const crearTurnosSemanalesService = async (datosTurno) => {
}