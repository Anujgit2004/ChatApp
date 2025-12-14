import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';

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
    <div>
      <form action="" onSubmit={handlesubmit}>

      <input type="text" placeholder='Enter Name'  name='name' value={fdata.name} onChange={handledata}/>
        <br />
        <input type="email" name='email' placeholder='Enter Email' value={fdata.email}  onChange={handledata}/>
        <br />
        <input type="text" name='password' placeholder='Enter Password' value={fdata.password}  onChange={handledata} />
        <br />
        <input type="submit" value={'Add'} />
      </form>
    </div>
  )
}
