import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './block.mjs';
import Transaction from './Transaction.mjs';

/**
 * Represents the blockchain and manages the chain of blocks,
 * including adding new blocks and validating the chain.
 */
export default class Blockchain {
  /**
   * Constructs a new blockchain instance and initializes a genesis block.
   */
  constructor() {
    this.chain = [];
    this.peerNodes = [];
    this.pendingTransactions = [];
    this.nodeUrl = process.argv[3];
    this.createGenesisBlock();
  }

  /**
   * Creates the genesis block and adds it to the blockchain.
   */
  createGenesisBlock() {
    const timestamp = Date.now();
    const index = 0;
    const previousHash = '0'; 
    const data = [];
    const nonce = 1337;
    const difficulty = 2;
    
    const currentHash = this.hashBlock(timestamp, previousHash, data, nonce, difficulty);

    const genesisBlock = new Block(
      timestamp,
      index,
      currentHash,
      previousHash,
      data,
      nonce,
      difficulty
    );
    
    this.chain.push(genesisBlock);
    
  }

  /**
   * Creates a new block, adds it to the blockchain, and returns the block.
   * @param {string} previousHash - The hash of the previous block.
   * @param {Object} data - The data to be stored in the block.
   * @param {number} nonce - The nonce value of the block.
   * @param {number} difficulty - The difficulty of the block.
   * @returns {Block} - The newly created block.
   */
  createBlock(previousHash, data, nonce, difficulty){
    const timestamp = Date.now();
    const currentHash = this.hashBlock(timestamp, previousHash, data, nonce, difficulty);
    const block = new Block(
      timestamp,
      this.chain.length,
      currentHash,
      previousHash,
      data,
      nonce,
      difficulty
    );

    this.pendingTransactions = [];
    this.chain.push(block);

    return block;
  };


  createTransaction(amount, sender, recipient) {
    return new Transaction(amount, sender, recipient);
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLastBlock().blockIndex + 1;
  }

  /**
   * Retreives the last block in the chain
   * @returns {Block} - The last block in the chain.
   */
  getLastBlock(){
    return this.chain.at(-1);
  };

  /**
   * Template literals to concatenate the timestamp, previousHash, and blockData,
   * into a single string. The string is then hashed using the createHash function. 
   * @param {Number} timestamp - The timestamp when the block was created.
   * @param {String} previousHash - The hash of the previous block.
   * @param {Object[]} blockData - The data of the block to hash.
   * @param {Number} nonce - The nonce value of the block.
   * @param {Number} difficulty - The difficulty of the block.
   * @returns {String} - The resulting hash in hexadecimal format.
   */
  hashBlock(timestamp, previousHash, blockData, nonce, difficulty) {
    const stringToHash = `${timestamp}${previousHash}${JSON.stringify(blockData)}${nonce}${difficulty}`;
    const hash = createHash(stringToHash);

    return hash;
  };

  proofOfWork(previousHash, data) {
    const lastBlock = this.getLastBlock();
    let nonce = 0, hash, timestamp;;
    let difficulty = lastBlock.difficulty;
    

    do {
      nonce++;
      timestamp = Date.now();

      difficulty = this.difficultyAdjustment(lastBlock, timestamp);
      hash = this.hashBlock(
        timestamp,
        previousHash,
        data,
        nonce,
        difficulty
      );
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return {nonce, difficulty, timestamp};
  }

  difficultyAdjustment(lastBlock, timestamp) {
    const MINE_RATE = parseInt(process.env.MINE_RATE, 10);
    if (timestamp - lastBlock.timestamp < MINE_RATE) {
      return lastBlock.difficulty + 1;
    } else {     
      return Math.max(lastBlock.difficulty - 1, 1);
    }
  }
  

  /**
   * Validates the integrity of the entire blockchain by checking each block's hash,
   * and the links to its previous block.
   * @param {Block[]} blockchain - An array of blocks representing the blockchain.
   * @returns {boolean} - True if the blockchain is valid, false if not.
   */
  validateChain(blockchain) {
    let isValid = true;

    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];
      console.log(block);

      const previousBlock = blockchain[i - 1];
      const hashValidation = this.hashBlock(
        block.timestamp,
        block.previousHash,
        block.data,
        block.nonce,
        block.difficulty
      );

      if (hashValidation !== block.currentHash || block.previousHash !== previousBlock.currentHash) {
        isValid = false;
        break;  
      }
    }

    return isValid;

  };
};