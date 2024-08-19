import "../DB/config.js";
import express from "express";
import cors from "cors";
//

import path from 'path';
import { fileURLToPath } from 'url';

// Obtén el directorio del archivo actual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//
import productosRouter from "../routes/productos.routes.js";
import usuariosRouter from "../routes/usuarios.routes.js";
import loginRouter from "../routes/login.routes.js";
import registerRouter from "../routes/register.routes.js";

class Server {
  constructor(puerto) {
    this.app = express();
    this.port = process.env.PORT || puerto;
    this.middlewares();
    this.rutas();
  }

  rutas() {
    // Usar las rutas definidas en productos.js
    this.app.use("/productos", productosRouter);
    this.app.use("/usuarios", usuariosRouter);
    this.app.use("/login", loginRouter);
    this.app.use("/register", registerRouter);
    this.app.get("/api/hello", (req, res) => {
      res.json({ message: "Hello from the server!" });
    });

    // Ruta para servir el HTML
    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, '../views/indice.html'));
    });
  }

  middlewares() {
    // MiddleWare
    const corsOptions = {
      origin: [
        "http://localhost:5173",
        "https://reactfrontendtemplates.netlify.app",
      ], // Permitir solicitudes desde estos orígenes
      methods: "GET,POST,PUT,DELETE", // Métodos permitidos
      allowedHeaders: "Content-Type,Authorization", // Encabezados permitidos
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor levantado en http://localhost:${this.port}`);
    });
  }
}

export default Server;
