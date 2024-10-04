import React, { useEffect, useState } from "react";
import RichTextEditorComponent from "../components/RichTextEditor";
import GetBlog from "../components/GetBlog";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://blog-post-hseq.onrender.com/api/v1/blog/posts");
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Error fetching blog posts");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
    }, []);

  const addPost = (newPost) => {
    setBlogs((prevPosts) => [...prevPosts, newPost]); // Add new post to the existing posts
  };

    if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <RichTextEditorComponent addPost={addPost}/>
      <GetBlog blogs={blogs}/>
    </>
  );
};

export default Home;
