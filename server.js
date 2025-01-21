const { createServer: createHttpsServer } = require('https');
const { createServer: createHttpServer } = require('http');
const fs = require('fs');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = parseInt(process.env.PORT || '3000', 10);
const HTTPS_PORT = parseInt(process.env.HTTPS_PORT || '3001', 10);

// Options pour le certificat auto-signé
const httpsOptions = {
  key: fs.readFileSync(path.join(process.cwd(), 'certificates', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(process.cwd(), 'certificates', 'localhost.pem')),
};

app.prepare()
  .then(() => {
    // Créer le serveur HTTP
    const httpServer = createHttpServer((req, res) => {
      // Rediriger HTTP vers HTTPS en production
      if (process.env.NODE_ENV === 'production') {
        const httpsUrl = `https://${req.headers.host}${req.url}`;
        res.writeHead(301, { Location: httpsUrl });
        res.end();
      } else {
        handle(req, res);
      }
    });

    // Créer le serveur HTTPS
    const httpsServer = createHttpsServer(httpsOptions, (req, res) => {
      handle(req, res);
    });

    // Démarrer les serveurs
    httpServer.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> HTTP server running on http://localhost:${PORT}`);
    });

    httpsServer.listen(HTTPS_PORT, (err) => {
      if (err) throw err;
      console.log(`> HTTPS server running on https://localhost:${HTTPS_PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  }); 