import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import FlashMessage from "../components/FlashMessage";
import eyeOpen from "../assets/eye-open.svg";
import eyeClosed from "../assets/eye-closed.svg";
import './style.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [flash, setFlash] = useState(null);



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
      <div className="container">
        <div className="card">
          {flash && <FlashMessage message={flash} onClose={() => setFlash(null)} />}
          <h2 className="title">Sign In</h2>
          <p className="title-subtext">Hello world</p>

          <form onSubmit={handleSignin} className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Give your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Give your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="input"
                />
                <img
                  src={showPassword ? eyeClosed : eyeOpen}
                  alt="Toggle Password"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">Sign In</button>
          </form>

          <div className="login-link">
            Don't have an account?
            <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
