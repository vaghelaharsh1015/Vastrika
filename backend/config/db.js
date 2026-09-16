import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vastrika', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`\x1b[32m[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})\x1b[0m`);
    return conn;
  } catch (error) {
    console.error(`\x1b[31m[MongoDB Connection Error]: ${error.message}\x1b[0m`);
    console.log('\x1b[33m[Notice]: If local MongoDB is not installed/running, please make sure MongoDB Service or MongoDB Atlas URI is set in .env.\x1b[0m');
    return null;
  }
};
