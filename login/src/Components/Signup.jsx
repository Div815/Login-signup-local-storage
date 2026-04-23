import React, { useState } from 'react'
import '../Components/Signup.css'
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
const Signup = () => {
    const userData={
        name:"",
        email:"",
        password:""
    }
    const [data,setData]= useState(userData);

    const navigate=useNavigate();

    const handleInput =(e)=>{
        console.log(e.target.value);
        console.log(e.target.name);
        const name=e.target.name;
        const value = e.target.value;

        setData({...data,[name]:value})
    }

    const handleSubmit= async(e)=>{
     e.preventDefault();
     if (data.name === "" || data.email === "" || data.password === "") {
        alert("Enter all the details");
    } else {
        
        const localData = localStorage.getItem("user");
        const getData = localData ? JSON.parse(localData) : [];

        
        const currentUsers = Array.isArray(getData) ? getData : [];

        
        const updatedUsers = [...currentUsers, data];

      
        localStorage.setItem("user", JSON.stringify(updatedUsers));
     
        toast.success("User registered Successfully")
        await new Promise(res => setTimeout(res, 2000));
        
        navigate("/login");
    }
};
    
    
  return (
    <div>
        <div className='main'>
            <Toaster/>
            <form onSubmit={handleSubmit}>
                <div className='heading'>
                    <p>Signup</p>
                </div>
                <div className='account'>
                    <input type='text' name="name" placeholder='Enter your name'onChange={handleInput} required/>
                    <input type='email' name="email" placeholder='Enter your email'onChange={handleInput} required/>
                    <input type='password' name="password" placeholder='Enter password'onChange={handleInput} required/>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
                <button>SignUp</button>
            </form>
        </div>
    </div>
  )
}

export default Signup