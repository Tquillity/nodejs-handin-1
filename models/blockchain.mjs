import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './block.mjs';

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

    this.nodeUrl = process.argv[3];

    this.createBlock(Date.now(), '0', '0', []);
  }

  /**
   * Creates a new block, adds it to the blockchain, and returns the block.
   * @param {number} timestamp - The timestamp when the block was created.
   * @param {string} previousHash - The hash of the previous block.
   * @param {string} currentHash - The hash of the current block.
   * @param {Object} data - The data to be stored in the block.
   * @returns {Block} - The newly created block.
   */
  createBlock(timestamp, previousHash, currentHash, data){
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousHash,
      currentHash,
      data
    );

    this.chain.push(block);

    return block;
  };

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
   * @returns {String} - The resulting hash in hexadecimal format.
   */
  hashBlock(timestamp, previousHash, blockData) {
    const stringToHash = `${timestamp}${previousHash}${JSON.stringify(blockData)}`;
    const hash = createHash(stringToHash);

    return hash;
  };

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
        block.data
      );

      if (hashValidation !== block.currentHash) isValid = false;
      if (block.previousHash !== previousBlock.currentHash) isValid = false;
    }

    return isValid;

  };
};