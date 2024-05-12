import express from 'express';
import cors from 'cors';
import blockchainRouter from './routes/blockchain-routes.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import memberRouter from './routes/member-routes.mjs';
import errorHandler from './middleware/errorHandler.mjs';

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

// Use CORS all doors open...
app.use(cors());

// Middleware...
app.use(express.json());

// Definierar endpoints...
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/members', memberRouter);

// Error handling middleware...
app.use(errorHandler);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});