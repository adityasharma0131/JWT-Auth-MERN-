import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Secret = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        try {
          const { data } = await axios.post(
            "http://localhost:3000",
            {},
            {
              withCredentials: true,
            }
          );
          if (!data.status) {
            removeCookie("jwt");
            navigate("/login");
          } else {
            toast(`Hi ${data.user} 🦄`, {
              theme: "dark",
            });
          }
        } catch (error) {
          console.error("Error verifying user", error);
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies.jwt, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <div className="private">
      <h1>Super Secret Page</h1>
      <button onClick={logOut}>Logout</button>
      <Toaster />
    </div>
  );
};

export default Secret;
