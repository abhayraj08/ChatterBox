import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import FlashMessage from "../components/FlashMessage";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [flash, setFlash] = useState(null);

  // useEffect(() => {
  //   // Clear localStorage when visiting signup page
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("username");
  // }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/chat");
    } catch (err) {
      if (err.response) {
        // backend responded with error
        setFlash(err.response.data.error);
      } else if (err.request) {
        // backend not reachable
        setFlash("⚠️ Backend server not connected");
      } else {
        setFlash("Unexpected error occurred");
      }
    }
  };

  return (
    <div>
      {flash && <FlashMessage message={flash} onClose={() => setFlash(null)} />}
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign Up</button>
      </form>

      <div className="login-link">
        Already have an account?
        <a href="/signin"> Sign In</a>
      </div>
    </div>
  );
}
