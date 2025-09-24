import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useMemo } from "react";
import FlashMessage from "../components/FlashMessage";
import eyeOpen from "../assets/eye-open.svg";
import eyeClosed from "../assets/eye-closed.svg";
import './style.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [flash, setFlash] = useState(null);

  // Password validation checks
  const validations = useMemo(() => ({
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
  }), [form.password]);

  const allPasswordValid = Object.values(validations).every(Boolean);
  const passwordsMatch = form.password === form.confirmPassword;
  const canSubmit = form.username.trim().length > 0 && allPasswordValid && passwordsMatch;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setFlash("⚠️ Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        username: form.username.trim(),
        password: form.password  // don't send confirmPassword to backend
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      navigate("/chat");
    } catch (err) {
      if (err.response) setFlash(err.response.data.error);
      else if (err.request) setFlash("⚠️ Backend server not connected");
      else setFlash("Unexpected error occurred");
    }
  };

  return (
    <div className="container">
      <div className="card">
        {flash && <FlashMessage message={flash} onClose={() => setFlash(null)} />}
        <h2 className="title">Sign Up</h2>
        <p className="title-subtext">Create an account to get started</p>

        <form onSubmit={handleSignup} className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
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
                placeholder="Create a password"
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

            {form.password.length > 0 && (
              <ul className="password-rules">
                <li className={validations.length ? "valid" : "invalid"}>
                  {validations.length ? "✔" : "✖"} At least 8 characters
                </li>
                <li className={validations.uppercase ? "valid" : "invalid"}>
                  {validations.uppercase ? "✔" : "✖"} One uppercase letter
                </li>
                <li className={validations.lowercase ? "valid" : "invalid"}>
                  {validations.lowercase ? "✔" : "✖"} One lowercase letter
                </li>
                <li className={validations.number ? "valid" : "invalid"}>
                  {validations.number ? "✔" : "✖"} One number
                </li>
              </ul>
            )}

            {/* {form.password.length == 0 && ()} */}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrapper">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
                className="input"
              />
              <img
                src={showConfirmPassword ? eyeClosed : eyeOpen}
                alt="Toggle Confirm Password"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>

            {form.confirmPassword && !passwordsMatch && (
              <div className="confirm-error">✖ Passwords do not match</div>
            )}
          </div>

          <button
            type="submit"
            className={`submit-btn ${!canSubmit ? "disabled" : ""}`}
            disabled={!canSubmit}>
            Sign Up
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <a href="/signin">Sign in</a>
        </div>
      </div>
    </div>
  );
}
