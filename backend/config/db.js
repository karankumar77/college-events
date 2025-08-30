import mongoose from 'mongoose';
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  await mongoose.connect(uri, { dbName: process.env.DB_NAME || 'college_events' });
  console.log('✅ MongoDB connected');
};
