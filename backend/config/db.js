import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose connected " + conn.connection.host);
  } catch (error) {
    console.log("connectin error " + error);
    process.exit(1);
  }
};
