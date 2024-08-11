import Server from './server/app.js'

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          --color: #df1600;
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
        }

        .loader:hover {
          background: var(--color);
          box-shadow: 0 0 5px var(--color),
                      0 0 25px var(--color),
                      0 0 50px var(--color),
                      0 0 200px var(--color);
          transition: .3s ease;
        }

        .loader span {
          position: absolute;
          display: block;
        }

        .loader span:nth-child(1) {
          top: 0;
          left: -100%;
          width: 100%;
          height: 40px;
          background: linear-gradient(90deg, transparent, var(--color));
          animation: animate1 1s linear infinite;
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
          height: 40px;
          background: linear-gradient(270deg, transparent, var(--color));
          animation: animate3 1s linear infinite;
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
          width: 40px;
          background: linear-gradient(180deg, transparent, var(--color));
          animation: animate2 1s linear infinite;
          animation-delay: .5s;
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
          width: 40px;
          background: linear-gradient(360deg, transparent, var(--color));
          animation: animate4 1s linear infinite;
          animation-delay: .5s;
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
    </body>
    </html>
  `);
});

const servidor = new Server('3001');
servidor.listen();