import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { Context } from './App';
import { Link } from 'react-router-dom';
import chatlogo from './assets/icons8-chat-64.png'
export default function Form() {
  let {url,setUname}= useContext(Context)
  let navigate=useNavigate();
  let[param,setparam]=useState();
  let[pic,setpic]=useState('');
  console.log(pic)
    let [fdata,setfdata]=useState({
        name:"",
        email:"",
        password:"",
        
    })


    
  
    const handledata=(e)=>{
     let prod={...fdata}
      let getname=e.target.name;
     let getvalue=e.target.value;
prod[getname]=getvalue;
setfdata(prod)
    }
    
// const handlepic=(e)=>{
//  let picurls=URL.createObjectURL(e.target.files[0]);
//  fdata.pics=e.target.files[0]
//   setpic(picurls)
// }

console.log(pic)
const handlesubmit=async(e)=>{
  console.log(fdata)
  e.preventDefault();
let response=await fetch(`${url}/user/register`,{
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
   
   
     <div className="loginpage w-full h-screen flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-emerald-400 to-cyan-400">
            <img src={chatlogo} className='w-20 max-lg:w-14' />
            <div className="insideframe max-lg:w-4/6 max-sm:w-5/6 flex flex-col items-center gap-5 p-5 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-3xl">
        <h1 className='text-4xl max-md:text-3xl max-sm:text-xl'>Signup Page</h1>
       <form onSubmit={handlesubmit} className='w-2xl max-md:w-lg max-sm:w-xs flex flex-col items-center gap-6 p-5 rounded-2xl'>
         <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="text" placeholder='Enter Name'  name='name' value={fdata.name} onChange={handledata}/>
        <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="email" name='email' placeholder='Email' value={fdata.email} onChange={handledata}/>
        <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="text" name='password' placeholder='Password' value={fdata.password} onChange={handledata}/>
        {/* <div className='flex w-3/6 justify-around items-center'>
<label htmlFor="image-select" className='flex w-4/6 justify-between items-center cursor-pointer font-medium'>
        <input type="file" onChange={handlepic} hidden id='image-select'/>
        <img src={fdata.pics} alt="" className='w-12 h-12 rounded-2xl border'/>
        Upload
        </label>
         <p className='text-red-500 font-medium cursor-pointer' onClick={()=>setpic('')}>Remove</p>
        </div> */}
        
      <input className='cursor-pointer border-2 w-1/6 max-sm:w-2/6 p-1 rounded-xl hover:bg-black hover:text-white hover:border-0' type="submit" value={"Submit"}/>
            </form>
      <div className="login-info flex p-2 max-sm:p-0 gap-2 items-center">
        <p className='text-xl max-sm:text-sm'>Already Registered?</p>
        <Link to={'/login'}><button className='cursor-pointer max-sm:text-sm border-2 text-red-500 rounded-lg px-2 hover:bg-red-500 hover:border-0 hover:text-white'>Login Now</button></Link> 
      </div>
      
            </div>
       <Link to={'/'}> <button className='cursor-pointer text-2xl p-2  max-lg:text-xl max-sm:text-lg rounded-xl text-white bg-black'>Go To Homepage</button></Link>    
          </div>
    
  )
}
