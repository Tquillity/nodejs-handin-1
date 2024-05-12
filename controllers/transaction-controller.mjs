import { blockchain } from '../startup.mjs';
import { sendResponse, sendError } from '../middleware/responseHandler.mjs';
import logger from '../utilities/logger.mjs';


export const createTransaction = (req, res, next) => {
  try { 
    const transaction = req.body;
    const blockIndex = blockchain.addTransaction(transaction);

    sendResponse(res,201, { transaction, blockIndex }, 'Transaction created');
  } catch (error) {
      logger.error(error.message);
      sendError(res, 500, error.message);
  }
};

export const broadcastTransaction = (req, res, next) => {
  
  try {
    const transaction = blockchain.createTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
    );
    
    const blockIndex = blockchain.addTransaction(transaction);
    blockchain.peerNodes.forEach(async (url) => {
      await fetch(`${url}/api/v1/transactions/transaction`, {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: { 'Content-Type': 'application/json' },
      });
    });
    sendResponse(res, 201, {transaction, blockIndex}, 'Transaction created and broadcasted');
  } catch (error) {
      logger.error(`Error broadcasting transaction: ${error.message}`);
      sendError(res, 500, error.message);
  }
};