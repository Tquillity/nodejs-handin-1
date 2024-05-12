import Block from './block.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';

/**
   * Creates the genesis block and adds it to the blockchain.
   */
function createGenesisBlock() {
  const timestamp = Date.now();
  const index = 1;
  const previousHash = '0'; 
  const data = [];
  const nonce = 1337;
  const difficulty = parseInt(process.env.DIFFICULTY, 10) || 2;
  
  const currentHash = createHash(`${timestamp}${previousHash}${JSON.stringify(data)}${nonce}${difficulty}`);

  return new Block(
    timestamp,
    index,
    currentHash,
    previousHash,
    data,
    nonce,
    difficulty
  );
}

export { createGenesisBlock };