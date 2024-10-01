import { enviarCorreo } from '../utils/mailer.js';
import { MercadoPagoConfig, Preference } from 'mercadopago'; // Asegúrate de tener estas importaciones

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

export const postDonationService = async (amount, paymentMethod, returnUrl) => {
  // Verificamos el método de pago
  if (paymentMethod === 'mercadoPago') {
    // Llama a la función de Mercado Pago para manejar la donación
    return await MPDonationHandler(amount, returnUrl);
  } else {
    // Aquí podrías manejar otros métodos de pago en el futuro
    throw new Error(`Método de pago ${paymentMethod} no soportado`);
  }
};

const MPDonationHandler = async (amount, returnUrl) => {
  const cliente = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const items = [
    {
      title: 'Donación a fundación RollingVet',
      quantity: 1,
      unit_price: amount,
      currency_id: 'ARS', // Cambia según la moneda que uses
    }
  ];

  const preference = new Preference(cliente);

  const result = await preference.create({
    body: {
      items,
      back_urls: {
        success: `${returnUrl}/success`,
        failure: `${returnUrl}/failure`,
        pending: `${returnUrl}/pending`,
      },
      auto_return: 'approved',
    }
  });

  return {
    url: result.id, // URL para redirigir al usuario
    statusCode: 200,
  };
};