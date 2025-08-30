import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import User from './models/User.js';
dotenv.config();
const run = async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const exists = await User.findOne({ email });
  if (exists) {
    exists.role = 'admin'; await exists.save();
    console.log('Admin ensured:', email);
  } else {
    await User.create({ name: 'Admin', email, password: process.env.ADMIN_PASSWORD || 'Admin@123', role: 'admin' });
    console.log('Admin created:', email);
  }
  process.exit(0);
};
run().catch(e => { console.error(e); process.exit(1); });
