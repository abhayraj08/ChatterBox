import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import FlashMessage from "../components/FlashMessage";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [flash, setFlash] = useState(null);

  // inside component
  // useEffect(() => {
  //   // Clear localStorage when visiting signin page
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("username");
  // }, []);


  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/chat");
    } catch (err) {
      if (err.response) {
        setFlash(err.response.data.error);
      } else if (err.request) {
        setFlash("⚠️ Backend server not connected");
      } else {
        setFlash("Unexpected error occurred");
      }
    }
  };

  return (
    <div>
      {flash && <FlashMessage message={flash} onClose={() => setFlash(null)} />}
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      <div className="login-link">
        Don't have an account?
        <a href="/signup"> Sign Up</a>
      </div>
    </div>
  );
}
