import React, { useState } from 'react'
import toast,{ Toaster } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import '../Components/Login.css'

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();

 const handleInput =(e)=>{
  const name=e.target.name;
  const value= e.target.value;
  if("email"===name){
    setEmail(value)
  }
  if("password"===name){
    setPassword(value)
  }
}

const handleSubmit= async(e)=>{
  e.preventDefault();
  
  const getDetails = JSON.parse(localStorage.getItem("user") || "[]");

  
  const userMatch = getDetails.find((curValue) => {
    return curValue.email === email && curValue.password === password;
  });

  
  if (userMatch) {
    toast.success("Login successful");
    
    await new Promise(res => setTimeout(res, 1500));
    navigate("/home"); 
  } else {
    
    toast.error("Invalid Credentials");
  }
};


  return (
    <div>
      <div className='main'>
      <Toaster/>
      <form onSubmit={handleSubmit}>
                <div className='heading'>
                    <p>Login</p>
                </div>
                <div className='account'>
                    <input type='email' name="email" placeholder='Enter your email' onChange={handleInput}/>
                    <input type='password' name="password" placeholder='Enter password' onChange={handleInput}/>
                    <p>New User? <a href="/">Register</a></p>
                </div>
                <button>Login</button>
            </form>
      </div>
    </div>
  )
}

export default Login