/**
 * Test suite for the Block class
 * @module models/block.test.mjs
 */

import { describe, it, expect } from 'vitest'
import Block from './block.mjs';

describe('Block', () => {
  // Setup variables for use in the tests
  const timestamp = Date.now();
  const index = 0;
  const currentHash = 'current-hash';
  const previousHash = 'previous-hash';
  const data = 'complex-data';
  const nonce = 1;
  const difficulty = 1;

  // Create a new Block instance before each test
  const block = new Block(timestamp, index, currentHash, previousHash, data, nonce, difficulty);

  /**
   * Test suite for the Block properties
   */
  describe('Block Properties', () => { 
    // Tests to check if the Block class has the expected properties
    it('should have a timestamp property', () => {
      expect(block).toHaveProperty('timestamp');
    });
  
    it('should have an index property', () => {
      expect(block).toHaveProperty('index');
    });

    it('should have a currentHash property', () => {
      expect(block).toHaveProperty('currentHash');
    });
  
    it('should have a previousHash property', () => {
      expect(block).toHaveProperty('previousHash');
    });

    it('should have a data property', () => {
      expect(block).toHaveProperty('data');
    });

    it('should have a nonce property', () => {
      expect(block).toHaveProperty('nonce');
    });

    it ('should have a difficulty property', () => {
      expect(block).toHaveProperty('difficulty');
    });

    /**
     * Test suite for the expected values of the Block properties
     */
    describe('Expected valuesof the Block properties', () => {
      it('should set a timestamp', () => {
        expect(block.timestamp).not.toEqual(undefined);
      });
      
      it('should have data', () => {
        expect(block.data).toEqual(data);
      });

      it('should have a currentHash', () => {
        expect(block.currentHash).toEqual(currentHash);
      });

      it('should set the previousHash to the hash value of the previous block', () => {
        expect(block.previousHash).toEqual(previousHash);
      });

      it('should have a nonce', () => {
        expect(block.nonce).toEqual(nonce);
      });

      it('should have a difficulty', () => {
        expect(block.difficulty).toEqual(difficulty);
      });
    });
  });

  /**
   * Test the type of the Block instance
   */
  it('should return an instance of Block class', () => {
    expect(block instanceof Block).toBe(true);
  });
  
});