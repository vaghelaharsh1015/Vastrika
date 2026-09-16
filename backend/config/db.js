import mongoose from 'mongoose';

const DEFAULT_URI =
  'mongodb+srv://harsh_vaghela:Harsh_2008@cluster0.n6te9ga.mongodb.net/vastrika?retryWrites=true&w=majority&appName=Cluster0';

let cachedConnection = null;

export const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGO_URI || DEFAULT_URI;
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedConnection = conn;
    console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    return null;
  }
};
