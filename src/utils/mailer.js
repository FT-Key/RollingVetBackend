import nodemailer from 'nodemailer';

// Configuración del transportador
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar el correo
export const enviarCorreo = async (destinatario, asunto, mensaje) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Correo del remitente
    to: destinatario,              // Correo del destinatario
    subject: asunto,               // Asunto del correo
    text: mensaje,                 // Cuerpo del correo en texto
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};