import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI as string);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB error"+err);
      process.exit()
    });
  } catch (err) {
    console.log("something went wrong", err);
  }
}

