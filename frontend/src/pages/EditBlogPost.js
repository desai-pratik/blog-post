import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RichTextEditor from "react-rte";
import { toast } from "react-toastify";

const EditBlogPost = () => {
  const { id } = useParams(); 
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState(RichTextEditor.createEmptyValue());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blog-post-hseq.onrender.com/api/v1/blog/post/${id}`);
        const post = response.data.blog;
        console.log(post);
        
        if (post) {
          setHeading(post.heading); 
          setContent(RichTextEditor.createValueFromString(post.content, "html")); // Update content state
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the blog post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = {
        heading,
        content: content.toString("html"),
      };
      await axios.put(`https://blog-post-hseq.onrender.com/api/v1/blog/post/${id}`, updatedPost);
      toast.success("Blog post updated successfully!");
      navigate(`/post/${id}`); 
    } catch (err) {
      toast.error("Error updating blog post");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="heading">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Content</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;
