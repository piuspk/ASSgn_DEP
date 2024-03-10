import React, { useState } from 'react'
import './All.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { registerfunction } from '../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
// import {registerfunction} from '../services/Apis'


const Register = () => {
  const navigate = useNavigate();
  let [input,setinput] = useState(
    {
      person_name:"",
      email:"",
      phone:"",

    }
  )
  let fnct2 = (event) =>
  {
        let {name,value} = event.target;
        setinput({...input,[name]:value})
  }
  // console.log(input)
  const otpFnc = async(event)=>
  {
      // const {nam,ema,pas} = input;
      event.preventDefault();
      const emailRegex = /^[^!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+@iitrpr\.ac\.in$/i;

      const phoneRegex = /^\d{10}$/;
      const isValid2 = phoneRegex.test(input.phone);

     
      const isValid = emailRegex.test(input.email);
      
      if(!isValid)
      {
        toast.error("enter valid email!")
      }
      else if(input.person_name=== "")
      {
        toast.error("please enter name")
      }
      else if(!isValid2)
      {
        toast.error("enter ten digit phone number") 
      }
      else 
      {
          // toast.success("registration succesfully, Go To Login Page");
          const response = await registerfunction(input)
          // console.log(response);
          if(response.status === 200)
          {

            setinput({person_name:"",email:"",phone:""})
            toast.success("Registration Success");
            setTimeout(() =>{
              
              navigate("/")
            },1500)
          }
          else
          {
              toast.error("please enter valid/new email");
              setTimeout(()=>{
                window.location.reload()

              },1500)
          }
         
        
           
      }
      
  }
  
  return (
    <>
    <p>fnkgnjn</p>
        <section>
            <div className="form_group">
                <div className="header_form">
                    <h1>Sign Up</h1>
                    <p>Create an account to explore all our exciting features.</p>
                </div>
                <form>
                  <div className="enter_in_form">
                    <label htmlFor="person_name" >Name</label>
                    <input  type="text" name = "person_name" onChange = {fnct2}  placeholder="Enter your name"/>
                  </div>
                  <div className="enter_in_form">
                    <label htmlFor="email">Email</label>
                    <input  type="email" name = "email"  onChange = {fnct2}  placeholder="Enter your email"/>
                  </div>
                  <div className="enter_in_form">
                    <label htmlFor="email">Phone no.</label>
                    <input type="tel" name="phone" onChange={fnct2} placeholder="Enter your phone number" />

                  </div>
                  <button className="btn" onClick = {otpFnc} >Register</button>
                  <p className = "txt"> Already I have account <NavLink to ='/'>Login</NavLink> </p>
                  
                </form>
                <div className="anchor">
            <a href="/">login</a>
          </div>
            </div>
            <ToastContainer/>
        </section>
    </>
  )
}

export default Register