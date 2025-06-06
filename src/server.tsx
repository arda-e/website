import React from 'react';
import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import Home from './pages/home/Home.js';
import { renderToString } from 'react-dom/server';

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compression middleware
app.use(compression());

// Static files
app.use(express.static(join(__dirname, 'public')));

// 3. Inject the nonce into the script tag
app.get('/', (_req, res) => {
    const html = renderToString(<Home />);
    const nonce = res.locals.nonce;

    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
        <link rel="stylesheet" href="/main.css">
        <script type="importmap">
          {
            "imports": {
              "react": "https://esm.sh/react@19.1.0",
              "react/jsx-runtime": "https://esm.sh/react@19.1.0/jsx-runtime",
              "react/jsx-dev-runtime": "https://esm.sh/react@19.1.0/jsx-dev-runtime",
              "react-dom/client": "https://esm.sh/react-dom@19.1.0/client"
            }
          }
        </script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/app.js"></script>    
      </body>
    </html>
  `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});