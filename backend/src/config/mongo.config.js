import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn(
      "⚠️ MONGO_URI is not defined! Skipping MongoDB connection. " +
      "Set the MONGO_URI environment variable to connect to a database."
    );
    return null; // don't throw, just skip
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // exit if connection fails
  }
};

export default connectDB;
