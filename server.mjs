import express from 'express';
import cors from 'cors';
import blockchainRouter from './routes/blockchain-routes.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import memberRouter from './routes/member-routes.mjs';
import { loadBlockchain } from './controllers/blockchain-controller.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import logRequests from './middleware/logRequests.mjs';
import path from 'path';
import { fileURLToPath } from 'url';


const PORT = process.argv[2];
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;;

const app = express();

// Use CORS all doors open...
app.use(cors());

// Middleware...
app.use(express.json());

// logging middleware...
app.use(logRequests);

// Definierar endpoints...
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/members', memberRouter);

// Error handling middleware...
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  loadBlockchain();
});