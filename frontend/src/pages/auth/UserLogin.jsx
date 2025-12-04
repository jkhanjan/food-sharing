import React, { useState } from "react";
import "../../styles/auth-shared.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const response = await login(email, password); 

    if (response.success) {
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to continue your food journey.
          </p>
        </header>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-submit" type="submit">
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && <p className="auth-error">{error}</p>}
        </form>

        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
