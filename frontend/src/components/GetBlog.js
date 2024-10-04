import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogPost from "./BlogPost";

const GetBlog = ({blogs}) => {

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
