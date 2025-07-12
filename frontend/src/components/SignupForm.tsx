import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // <-- Add this
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Account registered! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2 seconds delay
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-gradient-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign Up</h2>

        <div className="login-group">
          <label htmlFor="signup-username">Username</label>
          <input
            id="signup-username"
            type="text"
            placeholder="Type your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="login-group">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-group">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">Sign Up</button>

        <button
          type="button"
          className="secondary-link"
          onClick={() => navigate("/login")}
        >
          Have an account? Login
        </button>
        {successMsg && <div className="success-message">{successMsg}</div>}
      </form>
    </div>
  );
};

export default SignupForm;