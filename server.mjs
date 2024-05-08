import express from 'express';
import blockchainRouter from './routes/blockchain-routes.mjs';

/**
 * The port on which the server will run, provided via command line arguments.
 * Script is setup in package.json for node-1 through node-3.
 * @type {number} - The port number.
 */
const PORT = process.argv[2];

/**
 * The main express application.
 * Used
 */
const app = express();

// Middleware...
app.use(express.json());

// Definierar endpoints...
app.use('/api/v1/blockchain', blockchainRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));