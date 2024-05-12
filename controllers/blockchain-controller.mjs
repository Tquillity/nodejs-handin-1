import { blockchain } from '../startup.mjs';
import { sendResponse, sendError } from '../middleware/responseHandler.mjs';
import logger from '../utilities/logger.mjs';
import { writeFileAsync, readFileAsync } from '../utilities/fileHandler.mjs';

const getBlockchain = (req, res) => {
  try {
    sendResponse(res, 200, blockchain, 'Blockchain retrieved successfully.');
  } catch (error) {
    logger.error(`Failed to retrieve blockchain: ${error.message}`);
    sendError(res, 500, 'Failed to retrieve blockchain.');
  }
};

const createBlock = async (req, res) => {
  try {
    const lastBlock = blockchain.getLastBlock();
    const data = blockchain.pendingTransactions;
    const { nonce, difficulty, timestamp } = blockchain.proofOfWork(lastBlock.currentHash, data);
    const currentHash = blockchain.hashBlock(timestamp, lastBlock.currentHash, data, nonce, difficulty);
    const block = blockchain.createBlock(lastBlock.currentHash, data, nonce, difficulty, timestamp);

    await writeFileAsync('data', 'blockchain.json', JSON.stringify(blockchain.chain));

    await Promise.all(blockchain.peerNodes.map(url => {
      const body = { block };
      return fetch(`${url}/api/v1/blockchain/block/broadcast`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
      });
    }));

    sendResponse(res, 200, { block }, 'Block is created and sent to peers');
  } catch (error) {
    logger.error(`Failed to create block: ${error.message}`);
    sendError(res, 500, 'Failed to create block.');
  }
};

const loadBlockchain = async () => {
  try {
    const data = await readFileAsync('data', 'blockchain.json');
    blockchain.chain = JSON.parse(data);
  } catch (error) {
    logger.error(`Failed to load blockchain: ${error.message}`);
  }
};

const updateChain = (req, res) => {
  try {
    const block = req.body.block;
    const lastBlock = blockchain.getLastBlock();
    if (lastBlock.currentHash === block.previousHash && lastBlock.blockIndex + 1 === block.blockIndex) {
      blockchain.chain.push(block);
      blockchain.pendingTransactions = [];
      sendResponse(res, 201, { block }, 'Block is added and sent to peers');
    } else {
      throw new Error('Block is rejected, invalid.');
    }
  } catch (error) {
    logger.error(`Failed to update chain: ${error.message}`);
    sendError(res, 500, error.message);
  }
};

const syncBlockchain = async (req, res) => {
  try {
    const currentLength = blockchain.chain.length;
    let maxLength = currentLength;
    let longestChain = null;

    const responses = await Promise.all(blockchain.peerNodes.map(member => fetch(`${member}/api/v1/blockchain`)));
    responses.forEach(async (response, index) => {
      if (response.ok) {
        const result = await response.json();
        if (result.data.chain.length > maxLength) {
          maxLength = result.data.chain.length;
          longestChain = result.data.chain;
        }
      }
    });

    if (longestChain && blockchain.validateChain(longestChain)) {
      blockchain.chain = longestChain;
      sendResponse(res, 200, { message: 'Synchronization complete' });
    } else {
      throw new Error('No valid chain found to sync.');
    }
  } catch (error) {
    logger.error(`Failed to synchronize blockchain: ${error.message}`);
    sendError(res, 500, 'Failed to synchronize blockchain.');
  }
};

export { createBlock, getBlockchain, syncBlockchain, updateChain, loadBlockchain };
