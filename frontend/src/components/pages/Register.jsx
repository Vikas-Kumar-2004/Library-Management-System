import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api"; // adjust if needed
import "../../App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        username,
        password,
        role,
      });

      if (res.data.success) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Library Management System</h1>
        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span
            className="link"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#007bff" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
