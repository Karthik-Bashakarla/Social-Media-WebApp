import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`DB connection established:${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectToMongoDB;
