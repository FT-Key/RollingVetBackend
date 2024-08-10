import { Router } from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

const router = Router();

const generateJwtToken = (userInfo) => {
  const payload = {
    google_uid: userInfo.sub,
    family_name: userInfo.family_name,
    given_name: userInfo.given_name,
    name: userInfo.name,
    email: userInfo.email,
    email_verified: userInfo.email_verified,
    picture: userInfo.picture,
  };

  return jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
};

router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    // Verificar el token con Google
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const userInfo = await response.json();

    if (userInfo.error) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    // Aquí puedes almacenar los datos del usuario en la base de datos

    // Emitir una sesión o token JWT
    const jwtToken = generateJwtToken(userInfo);

    res.json({ token: jwtToken });
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el token' });
  }
});

export default router;