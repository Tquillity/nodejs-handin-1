import { blockchain } from '../startup.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: blockchain });
};


const createBlock = (req, res, next) => {
  const lastBlock = blockchain.getLastBlock();
  const data = req.body;
  const timestamp = Date.now();

  const currentHash = blockchain.hashBlock(
    timestamp,
    lastBlock.currentHash,
    data
  );

  const newBlock = blockchain.createBlock(
    timestamp,
    lastBlock.currentHash,
    currentHash,
    data
  );

  res.status(201).json({ success: true, data: newBlock });
};

export { createBlock, getBlockchain };