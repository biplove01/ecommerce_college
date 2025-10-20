import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI not found in environment variables');
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Server will continue running without database connection');
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default connectDB;
