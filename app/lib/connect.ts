import mongoose from "mongoose";

async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

export default connect;
