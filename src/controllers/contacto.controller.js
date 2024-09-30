import { postContactoService } from '../services/contacto.service.js';

export const postContactoController = async (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;

  try {
    // Llamar al servicio para enviar el correo
    await postContactoService({ nombre, email, telefono, asunto, mensaje });

    return res.status(200).json({ message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ error: 'Error al enviar el correo.' });
  }
};