import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../constants/api"; // Import signup endpoint
import "./Form.css";

const SignupForm = () => {
  // Form state variables.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // Success message after signup

  const navigate = useNavigate(); // React Router hook for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser form behavior

    try {
      // Send signup request to backend
      const res = await fetch(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json(); // Parse the response JSON

      if (res.ok) {
        // If signup succeeds, show message and redirect after delay
        setSuccessMsg("Account registered! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      } else {
        // If backend returns error
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      // If request fails (e.g., network/server error)
      console.error("Signup error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-gradient-bg">
      {/* Signup Form UI */}
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign Up</h2>

        {/* Username input */}
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

        {/* Email input */}
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

        {/* Password input */}
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

        {/* Submit button */}
        <button type="submit" className="login-btn">Sign Up</button>

        {/* Link to Login */}
        <button
          type="button"
          className="secondary-link"
          onClick={() => navigate("/login")}
        >
          Have an account? Login
        </button>

        {/* Show success message if available */}
        {successMsg && <div className="success-message">{successMsg}</div>}
      </form>
    </div>
  );
};

export default SignupForm;
