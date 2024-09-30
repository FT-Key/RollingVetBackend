import { enviarCorreo } from '../utils/mailer.js';

export const postContactoService = async ({ nombre, email, telefono, asunto, mensaje }) => {
  // Crear el contenido del mensaje
  const contenidoMensaje = `
    Nombre: ${nombre}
    Email: ${email}
    Teléfono: ${telefono ? telefono : 'No proporcionado'}
    Mensaje: ${mensaje}
  `;

  // Correo de destino (cambia esto por el correo que desees)
  const correoDestino = 'CuentaAmigoNumero1@gmail.com'; // Cambia por el correo que quieras usar

  // Llamar a la función enviarCorreo para enviar el correo al destinatario específico
  await enviarCorreo(correoDestino, asunto, contenidoMensaje);
};