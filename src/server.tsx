import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import renderHtml from "./RenderHtml";

const app = express();

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compression middleware
app.use(compression());

// Static files
app.use(express.static(join(__dirname, 'public')));

app.get('/', (_req, res) => {
  renderHtml(res)
});

export default app;