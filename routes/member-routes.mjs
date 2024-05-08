import express from 'express';
import {
  listMembers,
  registerMember,
} from '../controllers/member-controller.mjs';

const router = express.Router();

router.route('/').get(listMembers);
router.route('/register-member').post(registerMember);

export default router;