import { Blog } from "../models/blog.model.js";

export async function post(req, res) {
  try {
    const { heading, content } = req.body;
    if (!heading || !content) {
      return res.status(400).json({ success: false, message: "all field requred" });
    }

    const newBlog = new Blog({
      heading,
      content,
    });

    await newBlog.save();
    return res.status(201).json({ success: true, content: newBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "internal server error" });
  }
}

export async function getAllPosts(req, res) {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSinglePost(req, res) {
  try {
    const { id } = req.params;
    const blogPost = await Blog.findById(id);

    if (!blogPost) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    return res.status(200).json({ success: true, blog: blogPost });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function editPost(req, res) {
  try {
    const { id } = req.params;
    const { heading, content } = req.body;

    if (!heading || !content) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, { heading, content }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    return res.status(200).json({ success: true, content: updatedBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    return res.status(200).json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
