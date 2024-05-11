import React, { useEffect, useState } from "react";
import { loginUserAPI } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider.jsx";
import User from "../model/User.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigator = useNavigate();

  const handlePasswordVisibility = (e) => {
    setShowPassword(e.target.checked);
  };

  const { login } = useAuth();

  function loginUser(e) {
    e.preventDefault();
    if (validateForm()) {
      const userResponse = { username, password };

      loginUserAPI(userResponse)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .then((data) => {
          setUsername("");
          setPassword("");
          const {
            username,
            email,
            firstName,
            lastName,
            token: accessToken,
            refreshToken,
          } = data;

          if (!username || !email || !accessToken || !refreshToken) {
            throw new Error("Incomplete user data received");
          }

          const user = new User(
            username,
            firstName,
            lastName,
            email,
            accessToken,
            refreshToken
          );
          login({ user });

          navigator("/");
        })
        .catch((error) => {
          console.error(
            "Error message during login: ",
            error.message || "An unknown error occured!"
          );
        });
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (username.trim()) {
      errorsCopy.username = "";
    } else {
      errorsCopy.username = "Username must not be blank";
      valid = false;
    }
    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password must not be blank";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-4 mt-5 mb-4 text-center">Login here.</h1>
        <div className="card col-md-6 offset-md-3">
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={username}
                  name="username"
                  placeholder="E.g. johnDoe"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-8 d-flex">
                    <input
                      type="checkbox"
                      className="mb-3"
                      onChange={handlePasswordVisibility}
                    />
                    <p className="px-2 pb-1">Show password</p>
                  </div>
                  <div className="col text-end">
                    <a href="#">Forgot password?</a>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success d-grid col-6 mx-auto mb-3"
                onClick={(e) => loginUser(e)}
              >
                Login
              </button>
            </form>
            <div className="container">
              <div>
                <p>
                  Don't have an account yet?{" "}
                  <a
                    href={`/signup`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigator("/signup");
                    }}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
