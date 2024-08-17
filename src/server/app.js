import '../DB/config.js';
import express from 'express';
import cors from 'cors';
import productosRouter from '../routes/productos.routes.js';
import usuariosRouter from '../routes/usuarios.routes.js';
import loginRouter from '../routes/login.routes.js';
import registerRouter from '../services/register.service.js';

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
    this.app.use('/login', loginRouter);
    this.app.use('/register', registerRouter);
    this.app.get('/api/hello', (req, res) => {
      res.json({ message: 'Hello from the server!' });
    });

    // Ruta para servir el HTML
    this.app.get('/', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Server</title>
          <style>
            :root {
              --color: #df1600;
              --animation-duration: 2s;
            }
        
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
        
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #000;
            }
        
            .loader {
              position: relative;
              width: 200px;
              height: 200px;
              overflow: hidden;
              -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
              transition: .5s ease;
            }
        
            .loader:hover {
              background: var(--color);
              box-shadow: 0 0 5px var(--color),
                          0 0 25px var(--color),
                          0 0 50px var(--color),
                          0 0 200px var(--color);
              transition: .5s ease;
            }
        
            .loader span {
              position: absolute;
              display: block;
            }
        
            .loader span:nth-child(1) {
              top: 0;
              left: -100%;
              width: 100%;
              height: 30px;
              background: linear-gradient(90deg, transparent, var(--color));
              animation: animate1 var(--animation-duration) linear infinite;
              animation-delay: 0s;
            }
        
            @keyframes animate1 {
              0% {
                left: -100%;
              }
        
              100% {
                left: 100%;
              }
            }
        
            .loader span:nth-child(3) {
              bottom: 0;
              right: -100%;
              width: 100%;
              height: 30px;
              background: linear-gradient(270deg, transparent, var(--color));
              animation: animate3 var(--animation-duration) linear infinite;
              animation-delay: 0s;
            }
        
            @keyframes animate3 {
              0% {
                right: -100%;
              }
        
              100% {
                right: 100%;
              }
            }
        
            .loader span:nth-child(2) {
              right: 0;
              top: -100%;
              height: 100%;
              width: 30px;
              background: linear-gradient(180deg, transparent, var(--color));
              animation: animate2 var(--animation-duration) linear infinite;
              animation-delay: calc(var(--animation-duration) / 2);
            }
        
            @keyframes animate2 {
              0% {
                top: -100%;
              }
        
              100% {
                top: 100%;
              }
            }
        
            .loader span:nth-child(4) {
              left: 0;
              bottom: -10%;
              height: 100%;
              width: 30px;
              background: linear-gradient(360deg, transparent, var(--color));
              animation: animate4 var(--animation-duration) linear infinite;
              animation-delay: calc(var(--animation-duration) / 2);
            }
        
            @keyframes animate4 {
              0% {
                top: 100%;
              }
        
              100% {
                top: -100%;
              }
            }
          </style>
        </head>
        
        <body>
          <div class="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        
          <script>
            const colors = ['#39FF14', '#03e9f4', '#00ff44', '#FF4500', '#FFFF33'];
            let currentColorIndex = 0;
        
            function changeColor() {
              currentColorIndex = (currentColorIndex + 1) % colors.length;
              document.documentElement.style.setProperty('--color', colors[currentColorIndex]);
            }
        
            setInterval(changeColor, 3000);
          </script>
        
        </body>
        
        </html>
      `);
    });
  }

  middlewares() {
    // MiddleWare
    const corsOptions = {
      origin: ['http://localhost:5173', 'https://reactfrontendtemplates.netlify.app'], // Permitir solicitudes desde estos orígenes
      methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
      allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
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