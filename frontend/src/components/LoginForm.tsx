import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/api"; // Import login endpoint
import "./Form.css";

const LoginForm = () => {
  // State for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook to programmatically navigate routes

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form reload behavior

    try {
      // Send login request to the backend
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); // Parse response body

      if (res.ok) {
        // If login is successful, store token and redirect
        localStorage.setItem("token", data.token);
        setError("");
        alert("Login successful!");
        navigate("/home");
      } else {
        // If backend responds with error
        setError(data.message || "Login failed");
      }
    } catch (err) {
      // If request fails (e.g., server down)
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-gradient-bg">
      {/* Login Form UI */}
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {/* Error message */}
        {error && <div className="login-error">{error}</div>}

        {/* Email input */}
        <div className="login-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div className="login-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="login-btn">Login</button>

        {/* Link to Signup */}
        <button
          type="button"
          className="secondary-link"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
