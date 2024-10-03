import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/blog/post/${id}`);
        setBlog(response.data.blog);
      } catch (err) {
        setError("Error fetching blog post");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!blog) {
    return <div className="text-red-500 text-center">Blog post not found</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.heading}</h1>
      <div className="text-gray-700 leading-relaxed blog-content" dangerouslySetInnerHTML={{ __html: blog.content.replace(/<img/g, '<img class="w-full object-cover max-h-[470px]"') }} />
    </div>
  );
};

export default SingleBlogPost;
