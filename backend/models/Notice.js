import mongoose from 'mongoose';
const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String, enum: ['General', 'Academic', 'Placement'], default: 'General' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
export default mongoose.model('Notice', noticeSchema);
