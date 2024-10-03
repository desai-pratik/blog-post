import express from "express";
import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  heading: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
