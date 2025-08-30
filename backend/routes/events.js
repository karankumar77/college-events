import express from 'express';
import Event from '../models/Event.js';
import { auth, requireAdmin } from '../middleware/auth.js';
const router = express.Router();
router.get('/', async (_req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});
router.post('/', auth, requireAdmin, async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(event);
});
router.put('/:id', auth, requireAdmin, async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/:id', auth, requireAdmin, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});
export default router;
