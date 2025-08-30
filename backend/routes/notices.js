import express from 'express';
import Notice from '../models/Notice.js';
import { auth, requireAdmin } from '../middleware/auth.js';
const router = express.Router();
router.get('/', async (_req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.json(notices);
});
router.post('/', auth, requireAdmin, async (req, res) => {
  const notice = await Notice.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(notice);
});
export default router;
