import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blog_post from "./routes/blog_post.route.js";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/v1/blog", blog_post);

app.get("/", (req, res) => {
  res.send("server is running");
});

const post = process.env.PORT || 5000;
app.listen(post, () => {
  console.log("server start in " + post);
  connectDB();
});
