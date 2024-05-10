import express from 'express';
import {
  createBlock,
  getBlockchain,
  syncBlockchain,
  updateChain,
} from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine').post(createBlock);
router.route('/consensus').get(syncBlockchain);
router.route('/block/broadcast').post(updateChain);

export default router;