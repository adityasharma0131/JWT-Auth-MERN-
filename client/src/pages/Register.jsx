import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  // toast.success(data.message || "User Created Successfully!");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/register", {
        ...values,
      }, 
    {
      withCredentials: true,
    });
      console.log(data);
      if (data) {
        if (data.errors) {
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={(e) => handelSubmit(e)}>
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
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;
