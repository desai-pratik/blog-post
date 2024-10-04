import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const BlogPost = ({ blog }) => {
  const navigate = useNavigate();

  const getSlicedHTMLContent = (content, limit = 100) => {
    const div = document.createElement("div");
    div.innerHTML = content;

    let textContent = div.innerText;
    if (textContent.length > limit) {
      textContent = textContent.slice(0, limit) + "...";
    }

    div.innerHTML = textContent;
    return div.innerHTML;
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(`https://blog-post-hseq.onrender.com/api/v1/blog/post/${blog._id}`);
        toast.success("Blog post deleted successfully!");
        navigate("/");
      } catch (error) {
        toast.error("Error deleting blog post");
      }
    }
  };

  return (
    <div key={blog._id} onClick={() => navigate(`/post/${blog._id}`)} className="border rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer">
      <div className="flex justify-between border-b">
        <h2 className="text-xl font-semibold p-4 ">{blog.heading}</h2>
        <div className="flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${blog._id}`);
            }}
            className="text-blue-500 hover:underline flex items-center"
          >
            <FaEdit className="mr-2" />
          </button>

          <button
            onClick={(e) => {
              handleDelete();
            }}
            className="text-blue-500 hover:underline flex items-center"
          >
           <FaTrash className="mr-1" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{
            __html: getSlicedHTMLContent(blog.content.replace(/<img/g, '<img class="w-full object-cover max-h-[470px]"'), 150),
          }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
