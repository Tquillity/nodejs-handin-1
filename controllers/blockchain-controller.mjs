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

const syncBlockchain = (req, res, next) => {

  const currentLength = blockchain.chain.length;
  let maxLength = currentLength;
  let longestChain = null;

  blockchain.peerNodes.forEach(async (member) => {
    const response = await fetch(`${member}/api/v1/blockchain`);

    if(response.ok) {
      const result = await response.json();

      if (result.data.chain.length > maxLength) {
        maxLength = result.data.chain.length;
        longestChain = result.data.chain;
      }

      if (
        !longestChain ||
        (longestChain && !blockchain.validateChain(longestChain))
      ) {
        console.log('The chain is invalid and syncronized');
      } else {
        blockchain.chain = longestChain;
        console.log(blockchain);
      }
    } 
  });
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: {message: 'Syncronization complete'},
  });
};

export { createBlock, getBlockchain, syncBlockchain };