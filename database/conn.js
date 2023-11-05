import mongoose from "mongoose";

export default async function connect() {
    await mongoose.connect(process.env.DB);
    console.log("Database connetion");
}