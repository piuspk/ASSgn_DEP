import React, { useState } from "react";
import "./All.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { sentOtpFunction } from "../services/Apis";
import { ToastContainer, toast } from "react-toastify";

const Login = (props) => {
  // let time = props.chk.date.toLocaleString('en-US',{month:'long'})
  // let year = props.chk.date.getFullYear()
  const location = useLocation();
  const chk = location.state ? location.state.chk : null;
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // console.log(val);
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const otpFnc = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+@iitrpr\.ac\.in$/i;

    const isValid = emailRegex.test(email);
    if (!isValid) {
      toast.error("invalid");
    } else {
      //  toast.success("login success");
      const data = {
        email: email,
      };

      const response = await sentOtpFunction(data);
      // console.log(response);
      if (response.status === 200) {
        navigate("/otp", { state: email });
      } else {
        toast.error("login error");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  };
  return (
    <>
      <section>
        {/* <div className="background-overlay"> */}
        <div className="form_group">
          <div className="header_form">
            <h1>Login</h1>
            <p>welcome to login page</p>
          </div>
          <form>
            <div className="enter_in_form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <button className="btn" onClick={otpFnc}>
              {chk === 0 ? "Resend OTP" : "Login"}
            </button>
           

            <p className="txt">
              Don't have account <NavLink to="/register">Sign Up</NavLink>{" "}
            </p>
          </form>
          <div className="anchor">
            <a href="/register">signup</a>
            {/* <a href="/">login</a> */}
          </div>
        </div>
        {/* </div> */}
        <ToastContainer />
      
      </section>
    </>
  );
};

export default Login;
