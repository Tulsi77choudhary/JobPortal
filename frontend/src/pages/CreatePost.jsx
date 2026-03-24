import { useState } from "react";
import API from "../config/api";
import { useNavigate } from "react-router-dom"; // Optional: to redirect after posting

function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    setLoading(true);

    try {
      // Assuming your backend expects { title, content }
      const response = await API.post("/posts", form);
      console.log("Post created:", response.data);
      
      // Clear form or redirect user
      alert("Post created successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>

        <input 
          className="w-full p-3 border rounded mb-3 focus:outline-purple-500"
          placeholder="Title"
          value={form.title} // Controlled component
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea 
          className="w-full p-3 border rounded mb-3 focus:outline-purple-500 h-32"
          placeholder="Content"
          value={form.content} // Controlled component
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button 
          onClick={handleSubmit}
          disabled={loading || !form.title || !form.content}
          className={`w-full text-white p-3 rounded transition-colors ${
            loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;