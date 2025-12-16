import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';
import { Link } from 'react-router-dom';
import chatlogo from './assets/icons8-chat-64.png'
export default function Form() {
  let {URL,setUname}= useContext(Context)
  let navigate=useNavigate();
  let[param,setparam]=useState();
    let [fdata,setfdata]=useState({
        name:"",
        email:"",
        password:""
    })

  
    const handledata=(e)=>{
     let prod={...fdata}
      let getname=e.target.name;
     let getvalue=e.target.value;
prod[getname]=getvalue;
setfdata(prod)
    }
    

const handlesubmit=async(e)=>{
  e.preventDefault();
let response=await fetch(`${URL}/user/register`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(fdata)
  })
 
  let token=await response.json();
if(token.message){
  alert("Invalid Credentials")
}
else{
 setUname(token.name.name)
localStorage.setItem("token",token.token);
localStorage.setItem("name",token.name._id)
let gettoken=localStorage.getItem("token");
if(gettoken){
navigate('/dashboard')
}
else{
 console.log("wrong credentials")
}
}
  setfdata({
     name:"",
    email:"",
    password:""
  })
  }
  return (
   
   
     <div className="loginpage border w-full h-screen flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-emerald-400 to-cyan-400">
            <img src={chatlogo} className='w-28' />
            <div className="insideframe flex flex-col items-center gap-5 p-5 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-3xl">
        <h1 className='text-4xl'>Signup Page</h1>
       <form onSubmit={handlesubmit} className='w-2xl flex flex-col items-center gap-6 p-5 rounded-2xl'>
         <input className='border-2 w-3/6 p-1 rounded-xl text-xl' type="text" placeholder='Enter Name'  name='name' value={fdata.name} onChange={handledata}/>
        <input className='border-2 w-3/6 p-1 rounded-xl text-xl' type="email" name='email' placeholder='Email' value={fdata.email} onChange={handledata}/>
        <input className='border-2 w-3/6 p-1 rounded-xl text-xl' type="text" name='password' placeholder='Password' value={fdata.password} onChange={handledata}/>
      <input className='cursor-pointer border-2 w-1/6 p-1 rounded-xl hover:bg-black hover:text-white hover:border-0' type="submit" value={"Submit"}/>
            </form>
      <div className="login-info flex p-2 gap-2 items-center">
        <p className='text-xl'>Already Registered?</p>
        <Link to={'/login'}><button className='cursor-pointer border-2 text-red-500 rounded-lg px-2 hover:bg-red-500 hover:border-0 hover:text-white'>Login Now</button></Link> 
      </div>
      
            </div>
       <Link to={'/'}> <button className='cursor-pointer text-2xl p-2 rounded-xl text-white bg-black'>Go To Homepage</button></Link>    
          </div>
    
  )
}
