import React from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  // toast.success(data.message || "User Created Successfully!");

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="*****" />
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
