import '../DB/config.js';
import express from 'express';
import cors from 'cors';
import productosRouter from '../routes/productos.routes.js';
import usuariosRouter from '../routes/usuarios.routes.js';
import googleAuthRouter from '../googleAuth.js';

class Server {
  constructor(puerto) {
    this.app = express();
    this.port = process.env.PORT || puerto;
    this.middlewares();
    this.rutas();
  }

  rutas() {
    // Usar las rutas definidas en productos.js
    this.app.use('/productos', productosRouter);
    this.app.use('/usuarios', usuariosRouter);
    this.app.use('/auth', googleAuthRouter);
    this.app.get('/api/hello', (req, res) => {
      res.json({ message: 'Hello from the server!' });
    });
  }

  middlewares() {
    // MiddleWare
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor levantado en http://localhost:${this.port}`);
    });
  }
}

export default Server;