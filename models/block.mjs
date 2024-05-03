/**
 * Represents a block in a blockchain.
 */

export default class Block {
  /**
   * 
   * @param {number} index - The index of the block in the blockchain.
   * @param {string} hash  - The hash of the current Block.
   * @param {string} previousHash - The has of the previous block.
   * @param {number} timestamp - The timestamp when the block was created.
   * @param {*} data - The data stored in the block, for this project a "Complex Object".
   */
  constructor(
    index,
    hash,
    previousHash,
    timestamp,
    data
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}
