import express from 'express';
import {
  createBlock,
  getBlockchain,
  syncBlockchain,
} from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine').post(createBlock);
router.route('/consensus').get(syncBlockchain);

export default router;