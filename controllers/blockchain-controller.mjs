import { blockchain } from '../startup.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: blockchain });
};


const createBlock = (req, res, next) => {
  const lastBlock = blockchain.getLastBlock();
  const data = blockchain.pendingTransactions;
  const { nonce, difficulty, timestamp } =blockchain.proofOfWork(
    lastBlock.currentHash,
    data
  );

  const currentHash = blockchain.hashBlock(
    timestamp,
    lastBlock.currentHash,
    data,
    nonce,
    difficulty
  );

  const newBlock = blockchain.createBlock(
    timestamp,
    lastBlock.currentHash,
    currentHash,
    data,
    nonce,
    difficulty,
  );

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: newBlock
  });
};

const updateChain = (req, res, next) => {
  const block = req.body.block;
  const lastBlock = blockchain.getLastBlock();
  const hash = lastBlock.currentHash === block.previousHash;
  const index = lastBlock.blockIndex + 1 === block.blockIndex;

  if (hash && index) {
    blockchain.chain.push(block);
    blockchain.pendingTransactions = [];
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {
        message: 'Block is added and sent to peers',
        block: block,
      },
    });
  } else {
    res.status(500).json({
      success: false,
      statusCode: 500,
      data: { message: 'Block is rejected, invalid', block },
    });
  }
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

export { createBlock, getBlockchain, syncBlockchain, updateChain };