import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';

export default function Login() {
   let{setUname,URL}= useContext(Context)
    let [data,setdata]=useState({
        email:"",
        password:""
    })
let navigate=useNavigate();
    const handlefield=(e)=>{
let udata={...data};
let name=e.target.name;
let value=e.target.value;
udata[name]=value;
setdata(udata);
    }

const handleSubmit=async(e)=>{
    console.log(data)
e.preventDefault();
let response=await fetch(`${URL}/auth/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
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

}
  return (
    <>
      <form onSubmit={handleSubmit}>
      <label>Enter Email:</label>  <input type="email" name='email' value={data.email} onChange={handlefield}/>
        <br />
        <br />
       <label>Enter Password:</label> <input type="text" name='password' value={data.password} onChange={handlefield}/>
        <br />
        <br />
        <input type="submit" value={"Add"}/>
      </form>
    </>
  )
}
