import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your login logic
  };

  return (
    <div className="login-gradient-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="login-group">
          <label htmlFor="login-email">Login</label>
          <input
            id="login-email"
            type="email"
            placeholder="login details"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="forgot-link">
            <button type="button" className="forgot-btn">Forgot password?</button>
          </div>
        </div>
        <button type="submit" className="login-btn">Login</button>
        <div className="signup-link">
          <button
            type="button"
            className="secondary-link"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;