import axios from "axios";
import { useState } from "react";
import RichTextEditor from "react-rte";

const RichTextEditorComponent = ({ addPost }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [heading, setHeading] = useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const blogPost = async () => {
    const content = value.toString("html");
    const postData = {
      heading: heading,
      content: content,
    };
    try {
      const response = await axios.post("https://blog-post-hseq.onrender.com/api/v1/blog/post", postData);
      addPost(response.data.content);
      setValue(RichTextEditor.createEmptyValue());
      setHeading("");
    } catch (error) {
      console.error("Error posting the blog:", error);
    }
  };

  // console.log(value.toString("html"));

  return (
    <div className="max-w-[1200px] mx-auto mt-4 border p-6 bg-white rounded-lg shadow-md">
      <h5 className="h5">Create Blog</h5>
      <input
        type="text"
        placeholder="Enter heading..."
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />
      <RichTextEditor value={value} onChange={handleChange} placeholder="Enter summary"/>
      <button onClick={blogPost} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Share
      </button>
    </div>
  );
};

export default RichTextEditorComponent;
