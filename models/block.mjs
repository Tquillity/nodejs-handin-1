/**
 * Represents a block in a blockchain.
 */

export default class Block {
  /**
   * 
   * @param {number} timestamp - The timestamp when the block was created. 
   * @param {number} index - The index of the block in the blockchain.
   * @param {string} currentHash  - The hash of the current Block.
   * @param {string} previousHash - The hash of the previous block.
   * @param {Object} data - The data stored in the block, for this project a "Complex Object".
   * @param {number} nonce - The nonce value of the block.
   * @param {number} difficulty - The difficulty of the block.
   */
  constructor(
    timestamp,
    index,
    currentHash,
    previousHash,
    data,
    nonce,
    difficulty
  ) {
    this.timestamp = timestamp;
    this.index = index;
    this.currentHash = currentHash;
    this.previousHash = previousHash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || +process.env.DIFFICULTY;
  }
}
