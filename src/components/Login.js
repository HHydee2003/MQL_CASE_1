import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user data in local storage
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard"); // Redirect to admin page if the user is an admin
        } else {
          navigate("/dashboard"); // Redirect to dashboard if the user is not an admin
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid username or password");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-success" type="submit">
                    Login
                  </button>
                </div>
                <div className="mt-3 text-center">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
