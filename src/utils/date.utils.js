//import moment from 'moment'; // Usamos moment.js para manejar las fechas
import moment from 'moment-timezone'; // Usamos moment timezone para establecer la zona horaria

export const HORAS_TURNOS = ['09:00', '11:00', '13:00', '15:00', '17:00'];

// Función para obtener la hora actual con una zona horaria específica
export const obtenerHoraActual = (zonaHoraria = 'America/Argentina/Buenos_Aires') => {
  return moment().tz(zonaHoraria);
};

// Función para ordenar los turnos por hora
export const ordenarTurnosPorHora = (fechaTurno) => {
  // Asegurarse de que el array de turnos existe
  if (!fechaTurno.turnos || fechaTurno.turnos.length === 0) {
    return fechaTurno;  // Si no hay turnos, devolver el mismo objeto
  }

  // Ordenar los turnos usando la hora como criterio de comparación
  fechaTurno.turnos.sort((a, b) => {
    // Convertir las horas en formato de 24h para comparar
    const horaA = parseInt(a.hora.replace(':', ''), 10);
    const horaB = parseInt(b.hora.replace(':', ''), 10);
    return horaA - horaB;
  });

  return fechaTurno;  // Retornar el objeto con los turnos ordenados
}

// Ejemplo de uso
const fechaTurno = {
  fecha: new Date(),
  turnos: [
    { hora: '14:00', tipoAtencion: 'Consulta de producto' },
    { hora: '09:00', tipoAtencion: 'Soporte técnico' },
    { hora: '11:00', tipoAtencion: 'Asesoría en compras' }
  ]
};

// Función para verificar si una hora está en el rango de la hora actual
export const verificarHoraEnRango = (horaAComparar, esMayor, limiteHoras = null, zonaHoraria = 'America/Argentina/Buenos_Aires') => {
  const horaActual = moment().tz(zonaHoraria);

  // Combinar la hora con la fecha actual si el formato es solo "HH:mm"
  let horaComparada;
  if (typeof horaAComparar === 'string' && horaAComparar.match(/^\d{2}:\d{2}$/)) {
    // Concatenar la fecha actual con la hora proporcionada
    const fechaActual = moment().format('YYYY-MM-DD');
    horaComparada = moment.tz(`${fechaActual} ${horaAComparar}`, 'YYYY-MM-DD HH:mm', zonaHoraria);
  } else {
    // Si es un formato de fecha completo, simplemente convertirlo
    horaComparada = moment(horaAComparar).tz(zonaHoraria);
  }

  if (esMayor) {
    if (limiteHoras) {
      return horaComparada.isAfter(horaActual) && horaComparada.isBefore(horaActual.add(limiteHoras, 'hours'));
    } else {
      return horaComparada.isAfter(horaActual);
    }
  } else {
    if (limiteHoras) {
      return horaComparada.isBefore(horaActual) && horaComparada.isAfter(horaActual.subtract(limiteHoras, 'hours'));
    } else {
      return horaComparada.isBefore(horaActual);
    }
  }
};

export const normalizeDate = (date) => {
  const normalizedDate = moment.tz(date, 'America/Argentina/Buenos_Aires').startOf('day').toDate();
  return normalizedDate;
};

export const obtenerFechasDeSemana = () => {
  const fechas = [];
  const timezone = 'America/Argentina/Buenos_Aires'; // Zona horaria de Argentina
  const hoy = moment.tz(timezone); // Fecha y hora actual en la zona horaria de Argentina
  const lunes = moment.tz(timezone).startOf('isoWeek'); // Comienza el lunes en la zona horaria de Argentina
  const sabado = moment.tz(timezone).endOf('isoWeek').subtract(1, 'day'); // Sábado en la zona horaria de Argentina

  // Solo generar las fechas de hoy hasta el sábado
  for (let i = 0; i < 6; i++) {
    const fecha = lunes.clone().add(i, 'days');
    if (fecha.isSameOrAfter(hoy, 'day') && fecha.isBefore(sabado, 'day')) {
      fechas.push(fecha.toDate());
    }
  }
  return fechas;
};