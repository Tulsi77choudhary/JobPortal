import { useState } from "react";
import API from "../../config/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    await API.post("/auth/register", form);
    alert("Registered");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input className="input" placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>

        <input className="input" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input type="password" className="input" placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button onClick={handleSubmit}
          className="w-full bg-green-500 text-white p-3 rounded-lg mt-4">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;