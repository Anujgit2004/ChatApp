import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { Context } from './App';
import { Link } from 'react-router-dom';
import chatlogo from './assets/icons8-chat-64.png'
export default function Form() {
  let { url, setUname } = useContext(Context)
  let navigate = useNavigate();
  let [param, setparam] = useState();
let [pic,setpic]=useState()
let[active,setactive]=useState(true)
let[active2,setactive2]=useState(true)
  let [fdata, setfdata] = useState({
    name: "",
    email: "",
    password: "",
    image: ""
  })




  const handledata = (e) => {
    let prod = { ...fdata }
    let getname = e.target.name;
    let getvalue = e.target.value;
    prod[getname] = getvalue;
    setfdata(prod)
  }



  const handlepic = async (file) => {
    setactive(false)
    const formdata = new FormData();
    formdata.append("image", file);
  await fetch(`${url}/user/uploadpic`, {
      method: "POST",
      body: formdata
    }).then((res)=>res.text()).then((datas)=>{fdata.image=datas,setpic(datas)})
    setactive(true)
   console.log(fdata)
  }


  const handlesubmit = async (e) => {
    console.log(fdata)
    e.preventDefault();
    setactive2(false)
    let response = await fetch(`${url}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fdata)
    })



    let token = await response.json();
    if (token.message) {
      alert("Invalid Credentials")
      setactive2(true)
    }
    else {
      setUname(token.name.name)
      localStorage.setItem("token", token.token);
      localStorage.setItem("name", token.name._id)
      let gettoken = localStorage.getItem("token");
      if (gettoken) {
        navigate('/dashboard')
      }
      else {
        console.log("wrong credentials")
      }
    }
    setfdata({
      name: "",
      email: "",
      password: "",
      image:""
    })

  }
  return (


    <div className="loginpage w-full h-screen flex flex-col items-center gap-3 bg-gradient-to-r from-emerald-400 to-cyan-400">
      <img src={chatlogo} className='w-20 max-lg:w-14' />
      <div className="insideframe max-lg:w-4/6 max-sm:w-5/6 flex flex-col items-center gap-5 p-5 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-3xl">
        <h1 className='text-4xl max-md:text-3xl max-sm:text-xl'>Signup Page</h1>
        <form onSubmit={handlesubmit} className='w-2xl max-md:w-lg max-sm:w-xs flex flex-col items-center gap-6 p-5 rounded-2xl'>
          <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="text" placeholder='Enter Name' name='name' value={fdata.name} onChange={handledata} />
          <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="email" name='email' placeholder='Email' value={fdata.email} onChange={handledata} />
          <input className='border-2 w-3/6 max-md:w-4/6 max-sm:w-5/6 p-1 rounded-xl text-xl' type="text" name='password' placeholder='Password' value={fdata.password} onChange={handledata} />
          <div className='flex w-3/6 h-15 max-md:w-5/6 justify-around items-center'>
            <label htmlFor="image-select" className='flex w-4/6 justify-between items-center cursor-pointer font-medium'>
              <input type="file" onChange={(e) => handlepic(e.target.files[0])} hidden id='image-select' />
              {(active)?
              <img src={pic} alt="" className='w-12 h-12 rounded-2xl border' />
              :
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FF156D" stroke="#FF156D" stroke-width="2" r="10" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="3.4" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="2" r="10" cx="80" cy="100"><animate attributeName="opacity" calcMode="spline" dur="3.4" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" stroke-width="2" r="10" cx="120" cy="100"><animate attributeName="opacity" calcMode="spline" dur="3.4" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>

              }
              
             
              Upload
            </label>
            <p className='text-red-500 font-medium cursor-pointer' onClick={()=>setpic()}>Remove</p>
          </div>

          <input className='cursor-pointer border-2 w-1/6 max-sm:w-2/6 p-1 rounded-xl hover:bg-black hover:text-white hover:border-0' type="submit" value={active2?"Submit":"Loading..."} />
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
