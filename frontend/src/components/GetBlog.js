import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogPost from "./BlogPost";

const GetBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/blog/posts");
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Error fetching blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogPost blog={blog}/>
        ))}
      </div>
    </div>
  );
};

export default GetBlog;
