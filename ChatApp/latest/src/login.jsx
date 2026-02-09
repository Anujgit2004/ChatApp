import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './App';
import { Link } from 'react-router-dom';
import chatlogo from './assets/icons8-chat-64.png'
export default function Login() {
   let{setUname,url}= useContext(Context)
   let [active,setactive]=useState(true)
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
setactive(false)
setTimeout(async() => {
  let response=await fetch(`${url}/auth/login`,{
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
}, 3000);


console.log(active)
}
  return (
    <>
    <div className="loginpage w-full h-screen flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-amber-500 to-pink-500">
      <img src={chatlogo} className='w-28 max-lg:w-14' />
      <div className="insideframe max-lg:w-4/6 max-sm:w-5/6 flex flex-col items-center gap-5 p-5 bg-gradient-to-r from-rose-400 to-red-300 rounded-3xl">
  <h1 className='text-4xl max-md:text-3xl max-sm:text-xl'>Login Page</h1>
 <form onSubmit={handleSubmit} className='w-2xl max-md:w-lg max-sm:w-xs flex flex-col items-center gap-6 p-5 rounded-2xl'>
  <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="email" name='email' placeholder='Email' value={data.email} onChange={handlefield}/>
  <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="text" name='password' placeholder='Password' value={data.password} onChange={handlefield}/>
<input className='cursor-pointer border-2 w-1/6 max-sm:w-2/6 p-1 rounded-xl hover:bg-black hover:text-white hover:border-0' type="submit" value={active?"Submit":"Loading..."}/>
      </form>
<div className="signup-info flex p-2 max-sm:p-0 gap-2 items-center">
  <p className='text-xl max-sm:text-sm'>Don't have account</p>
  <Link to={'/Signup'}><button className='cursor-pointer border-2 text-white max-sm:text-sm rounded-lg px-2 hover:bg-red-500 hover:border-0 hover:text-white'>Signup Now</button></Link>
</div>

      </div>
       <Link to={'/'}> <button className='cursor-pointer text-2xl max-lg:text-xl max-sm:text-lg p-2 rounded-xl text-white bg-black'>Go To Homepage</button></Link>
    </div>
     
    </>
  )
}
