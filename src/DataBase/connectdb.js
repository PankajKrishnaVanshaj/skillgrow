import mongoose from "mongoose";

const connection = {};

async function connectToDatabase() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection failed");

    process.exit(1);
  }
}

export default connectToDatabase;
