import express from "express";
import { deletePost, editPost, getAllPosts, getSinglePost, post } from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/post", post);
router.get("/posts", getAllPosts); 
router.get("/post/:id", getSinglePost);
router.put("/post/:id", editPost);
router.delete("/post/:id", deletePost);

export default router;
