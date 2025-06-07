import app from './server.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});