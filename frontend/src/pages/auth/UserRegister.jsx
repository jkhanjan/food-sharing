import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth-shared.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authServices";

const UserRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposne = await authService.register({
      firstName,
      lastName,
      email,
      password,
      profilePic
    });
    console.log(resposne.data);
    if(resposne.success) navigate("/");
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="user-register-title"
      >
        <header>
          <h1 id="user-register-title" className="auth-title">
            Create your account
          </h1>
          <p className="auth-subtitle">
            Join to explore and enjoy delicious meals.
          </p>
        </header>
        <nav className="auth-alt-action" style={{ marginTop: "-4px" }}>
          <strong style={{ fontWeight: 600 }}>Switch:</strong>{" "}
          <Link to="/user/register">User</Link> •{" "}
          <Link to="/food-partner/register">Food partner</Link>
        </nav>
        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="field-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
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
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field-group">
            <label htmlFor="ProfilePic">ProfilePic</label>
            <input
              id="ProfilePic"
              name="ProfilePic"
              type="file"
              placeholder="ProfilePic"
              accept="image/*"
              onChange={(e) => {
                setProfilePic(e.target.files[0]);
              }}
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign Up
          </button>
        </form>
        <div className="auth-alt-action">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
