import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import "./All.css";
import { userUpdate } from "../services/Apis";

const Profile = () => {
  const location = useLocation();
  const user = location.state;
  const [userName, setUserName] = useState(user.person_name);
  const [mobileNo, setMobileNo] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);
  const handleUpdate = async() => {
    setIsEditing(false);
    const data={
      name: userName,
      phoneNo: mobileNo,
      email:email,
    }
    const response = await userUpdate(data);
    console.log(response);
          // console.log(response);
          if(response.status === 200)
          {
            toast.success("Updation Success");
            setTimeout(() =>{
            },1500)
          }
          else
          {
              toast.error("Cannot Update Email Id");
              setTimeout(()=>{
                window.location.reload()

              },1500)
          }
    console.log("Updated User Information:", { userName, mobileNo, email });
  };

  return (
    <>
      <section>
        <div className="form_group2">
          <div className="header_form">
            <h1 className = "common"
              style={{ color: "white", fontSize: "4em", marginBottom: "1rem"}}
            >
              {userName}
            </h1>
            {isEditing ? (
              <>
                <div className="form__group_field">
                  <input
                    type="text"
                    className="form__field"
                    placeholder="type your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ color: 'white' }} 
                  />
                  
                  <input
                    type="text"
                    className="form__field"
                    placeholder="type your mobile no."
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    style={{ color: 'white' }} 
                  />
                  

                  <input
                    type="text"
                    className="form__field"
                    placeholder="type your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ color: 'white' }} 
                  />
                 
                </div>
              </>
            ) : (
              <>
                <h4 className = "common" style={{ color: "white", fontSize: "2em" }}>
                  Mobile No: {mobileNo}
                </h4>
                <h4 className = "common" style={{ color: "white", fontSize: "2em" }}>
                  Email Address: {email}
                </h4>
              </>
            )}
          </div>
          <div className="anchor3">
            <button className = "btn3" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Information"}
            </button>
            &nbsp; &nbsp;
            {isEditing && (
              <button className = "btn3" onClick={handleUpdate}>Update Information</button>
            )}
          </div>
          <div className="anchor2">
            <a href="/dashboard">Dashboard</a>
            <a href="/">Logout</a>
          </div>
        </div>
        <ToastContainer/>

      </section>
    </>
  );
};

export default Profile;
