import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const generateSuccess = (message) =>
    toast.success(message, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      if (!values.email) generateError("Email is required");
      if (!values.password) generateError("Password is required");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          if (password) generateError(password);
        } else {
          generateSuccess("Successfully registered!");
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*****"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;
