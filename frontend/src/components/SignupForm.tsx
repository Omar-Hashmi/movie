import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/api";
import { MESSAGES } from "../constants/messages";
import "./Form.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(MESSAGES.SIGNUP_SUCCESS);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setSuccessMsg(data.message || MESSAGES.SIGNUP_FAILED);
      }
    } catch {
      setSuccessMsg(MESSAGES.SIGNUP_ERROR);
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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
