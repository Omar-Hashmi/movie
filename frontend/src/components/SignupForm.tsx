import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your signup logic
  };

  return (
    <div className="login-gradient-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Sign Up</h2>
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
      </form>
    </div>
  );
};

export default SignupForm;