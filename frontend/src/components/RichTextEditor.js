import axios from "axios";
import { useState } from "react";
import RichTextEditor from "react-rte";

const RichTextEditorComponent = () => {
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
      const response = await axios.post("http://localhost:5000/api/v1/blog/post", postData);
      console.log("Blog posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting the blog:", error);
    }
  };

  console.log(value.toString("html"));

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-white rounded-lg shadow-md">
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
