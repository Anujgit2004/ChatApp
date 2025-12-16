import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client';
import './App.css'
import { Context } from './App';
import chatlogo from './assets/icons8-chat-64.png'
export default function Dashboard() {
 let{URL,name}= useContext(Context)
let senderid=localStorage.getItem("name");


//  const socket=io(URL);
    let [users,setusers]=useState([]);
    let [active,setactive]=useState(true);
    let [Susers,setsusers]=useState([]);
    let [getid,setid]=useState(0);
    let[getmessage,setmessage]=useState([]);
    let[uname,setuname]=useState('Hello')
    let [datas,setdatas]=useState({
      message:''
    })
 let [Sname,setsname]=useState({
      name:''
    })

    

   let navigate= useNavigate();
  useEffect(()=>{
     let gettoken=localStorage.getItem("token");
    async function fetchs(){
  let data=await fetch(`${URL}/auth/chatters`);
let getuserdata=await data.json();
setusers(getuserdata);
     }

     if(gettoken){
 fetchs();
     }
  else{
    navigate('/login')
  }
    },[])



 async function fetchs(){
setactive(false)
setmessage('');
let getallmessage= await fetch(`${URL}/auth/${getid}/${senderid}`);
let final=await getallmessage.json();
setmessage( final)
setactive(true)
// socket.emit('join room',getid);
}

useEffect(()=>{
 
    fetchs();
  
 
// socket.on('new recieved',(newmsg)=>{
//   console.log(newmsg)
// })
},[getid])
//HANDLE ONSUBMIT
const handleSubmit=async(e)=>{
e.preventDefault();
await fetch(`${URL}/auth/send/${getid}/${senderid}`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(datas)
}).then(()=>{
  setTimeout(() => {
    fetch(`${URL}/auth/${getid}/${senderid}`).then((res)=>res.json()).then((final)=>{setmessage( final),console.log(final)});
  }, 1000);

})
console.log(senderid)
setdatas({
   message:''
})


// let facts=await sendMessage.json();
// socket.emit('new message',facts)

}




  //HANDLE INPUT FIELD 
const handleInput=(e)=>{
let prod={...datas};
let getvalue=e.target.value;
let getname=e.target.name;
prod[getname]=getvalue;
setdatas(prod);
}

//HANDLE NAME FIELD
const handlename=(e)=>{
let prod={...Sname};
let getvalue=e.target.value;
let getname=e.target.name;
prod[getname]=getvalue;
setsname(prod);
}


//HANDLE SEARCHBYNAME
const handleSearch=async(e)=>{
e.preventDefault();
let chattername=await fetch(`${URL}/auth/search?names=${Sname.name}`);
let getresult=await chattername.json();
setsusers(getresult)

setsname({
    name:''
  })
}


//lOGOUT
  const handlelogout=()=>{
localStorage.removeItem("token");
localStorage.removeItem("name");
navigate('/login')
}


let color={
color:'white',
marginRight:'0%',
backgroundColor:'green',
fontSize:'20px',
width:'40%',
borderRadius:'7px',
paddingLeft:'5px',
paddingRight:'5px',
display:'flex',
flexDirection:'column',
alignSelf:'flex-end',
gap:'5px'
}
let nocolor={
backgroundColor:'white',
fontSize:'20px',
width:'40%',
borderRadius:'7px',
paddingLeft:'5px',
paddingRight:'5px',
display:'flex',
flexDirection:'column',
gap:'5px'

}

let usercolor={
width:'80%'
}
let nousercolor={
width:'80%'
}






  return (
    <>
    <div className='flex flex-col h-screen bg-gradient-to-r from-blue-100 to-cyan-100 justify-around p-2'>
       <nav className='navbars w-full flex items-center justify-between rounded-xl px-2 bg-gradient-to-r from-emerald-400 to-cyan-400'>
      <img src={chatlogo}/>
      <h1 className='text-3xl font-bold text-emerald-600'>{name}</h1>
        <div className="button flex gap-3 items-center">
   <button onClick={handlelogout} className='cursor-pointer text-xl px-3 py-1 rounded-xl bg-red-500 text-white'>Logout</button>
    </div> 
    </nav>
    <div className="chatui flex w-full justify-around">
<div className='leftone bg-gradient-to-r from-teal-400 to-yellow-200'>
 <form onSubmit={handleSearch} className='searchbar w-5/6 flex justify-center gap-2'>
        <input className='searchinput border-2 border-black w-4/6 p-2 rounded-xl' placeholder='Enter Name...' type="text" name='name' value={Sname.name} onChange={handlename}/>
        <input className='searchbtn w-2/6 rounded-xl bg-black text-white cursor-pointer' type="Submit" value={'Search'}/>
      </form>
     {(Susers.length==0)?
    <div className='userlist'>
  {users.map((v,i)=>{
      return(
        <div key={i} style={(getid==v._id?usercolor:nousercolor)}>
          <p className='cursor-pointer text-black text-2xl hover:w-3/6 hover:bg-black hover:text-white hover:px-2 hover:py-1 rounded-xl font-medium' onClick={()=>{setid(v._id),setuname(v.name)}}>{v.name}</p>
        </div>
      )
    })}
    </div>
    :
<div className='userlist'>
  {Susers.map((v,i)=>{
      return(
        <div key={i} style={(getid==v._id?usercolor:nousercolor)}>
    <p style={{color:'white',fontSize:'20px',cursor:'pointer',margin:'0px'}} onClick={()=>{setid(v._id),setuname(v.name)}}>{v.name}</p>
        </div>
      )
    })}
    </div>
     }
   
    </div>
    <div className="rightone bg-gradient-to-r from-emerald-500 to-emerald-900">
      <div className="bg-white text-black rounded-xl p-2 text-center ">
        <p className='text-2xl font-medium'>{uname}</p>
      </div>
      <div className='chatarea bg-green-300'>   
        {       
(getmessage.length!=0&&active)?getmessage.map((v,i)=>{
  return(
    <div key={i} style={(getid==v.RecieverId)?color:nocolor}>
 <p style={{margin:'0px'}}>{v.message}</p>
 <div className="messagetime">
 <p style={{margin:'0px'}}>{new Date(v.createdAt).toLocaleDateString('en-IN')}</p>
 <p style={{margin:'0px'}}>{new Date(v.createdAt).toLocaleTimeString('en-IN')}</p>
 </div>

    </div> 
  )
}):<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#44061D"></stop><stop offset=".3" stop-color="#44061D" stop-opacity=".9"></stop><stop offset=".6" stop-color="#44061D" stop-opacity=".6"></stop><stop offset=".8" stop-color="#44061D" stop-opacity=".3"></stop><stop offset="1" stop-color="#44061D" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="13" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#44061D" stroke-width="13" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
        }   

      </div>
      <div className='send flex justify-center'>
      <form onSubmit={handleSubmit} className='w-5/6 flex gap-2'>
        <input className='border-2 border-black w-5/6 p-1 rounded-xl' type="text" placeholder='Enter message...' name='message' value={datas.message} onChange={handleInput}/>
        <input className='w-1/6 text-2xl border-black rounded-xl bg-black text-white cursor-pointer' type="Submit" value={'Send'}/>
      </form>
      </div>
    </div>
    </div>
    </div>
   
    
    </>
  )
}
