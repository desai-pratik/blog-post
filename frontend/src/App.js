import "./App.css";
import Home from "./pages/Home";
import {  Route, Routes } from "react-router-dom";
import SingleBlogPost from "./pages/SingleBlogPost ";
import EditBlogPost from "./pages/EditBlogPost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SingleBlogPost />} /> {/* Route for single blog post */}
        <Route path="/edit/:id" element={<EditBlogPost />} /> {/* Route for single blog post */}
      </Routes>
    </>
  );
}

export default App;
