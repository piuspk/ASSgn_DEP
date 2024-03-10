import React, { useEffect, useState } from "react";
import "./All.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = (props) => {
  const navigate = useNavigate();

  const LoginOrNot = ()=>{
    let token = localStorage.getItem("userdbtoken");
    if(token) {
        console.log("user valid")
    }
    else
    {
      toast.error("No User Logged In");

      
        navigate("/error");
      
     
    }

  }
  useEffect(()=>{
    LoginOrNot();
  },[])
  const location = useLocation();
  const user = location.state;
  const profilefinder = () => {
    if (user) {
      navigate("/profile", { state: user });
    }
    else {
      toast.error("No User Logged In");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <>
      <section>
        <div className="background-overlay">
          <div className="main-info">
            <div className="txt">
              <h1>Welcome to Your Dashboard</h1>
              <h6>Get ready for an incredible experience!</h6>
            </div>
          </div>
          <div className="anchor">
            <a style={{ color: "white" }} onClick={profilefinder}>
              profile
            </a>
            <a href="/">Logout</a>
          </div>
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
