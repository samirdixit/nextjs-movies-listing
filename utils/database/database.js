import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

// Function to connect to MongoDB
export const connectToDB = async () => {
  mongoose.set('strictQuery', true); // Set mongoose strict query mode

  // Check if already connected to MongoDB
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    // Attempt to connect to MongoDB using environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt", // Specify the database name
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new server discovery and monitoring engine
    });

    // Update the connection status
    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
