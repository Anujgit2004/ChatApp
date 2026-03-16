import React, { useContext, useEffect, useRef, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client';
 const socket=io("https://backend-chat-kzg0.onrender.com");
import './App.css'
import { Context } from './App';
import chatlogo from './assets/icons8-chat-64.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
export default function Dashboard() {
 let{url,name}= useContext(Context)

let senderid=localStorage.getItem("name");



 
//  const socket=io(url);
let [no,setno]=useState(1)
    let [users,setusers]=useState([]);
    let [active,setactive]=useState(false);
    let [Susers,setsusers]=useState([]);
    let [show,setshow]=useState(true)
    let [chatview,setview]=useState(true);
    let [getid,setid]=useState(0);
    let [chat,setchat]=useState([]);
    let[uname,setuname]=useState('Hello')
    let [datas,setdatas]=useState({
      message:'',
    })
 let [Sname,setsname]=useState({
      name:''
    })



useEffect(()=>{
socket.on("private message",(msg)=>{
  setchat(prev=>[...prev,msg])
})
 return()=>{
  socket.off("private message",msg);
 };
},[]);

useEffect(()=>{
    fetc();

},[getid])

useEffect(()=>{
  setTimeout(()=>{
    if(lastmsgref.current){
      lastmsgref.current.scrollIntoView({behaviour:"smooth"})
    }
  },100);
},[chat]);

let gettoken=localStorage.getItem("token");
useEffect(()=>{
  socket.emit("join",senderid);
    async function fetchs(){ 
  let data=await fetch(`${url}/auth/chatters`);
let getuserdata=await data.json();
setusers(getuserdata);

     }


     if(gettoken){
 fetchs();
     }
  else{
    navigate('/login')
  }
  console.log(senderid)
    },[])

console.log(users)
console.log(Susers)

const lastmsgref=useRef();
   let navigate= useNavigate();
 async function fetc(){
if(getid!=0){
 setshow(false)
setactive(false)
setchat('');
let getallmessage= await fetch(`${url}/auth/${getid}/${senderid}`);
let final=await getallmessage.json();
let finalchat=final.filter((v,i)=>!v.deletedFor.includes(senderid))
console.log(finalchat)
setchat( finalchat)
setactive(true)
}
 
}


const handleSubmit=async(e)=>{
  e.preventDefault();
socket.emit("private message",{
  senderid,
  getid,
  datas
});
setdatas({
  message:''
})
}


  //HANDLE INPUT FIELD 
const handleInput=(e)=>{
  let prod={...datas}
let inputs=e.target.value;
let names=e.target.name;
prod[names]=inputs;
setdatas(prod)
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
setview(false)
let chattername=await fetch(`${url}/auth/search?names=${Sname.name}`);
let getresult=await chattername.json();
setsusers(getresult)

setsname({
    name:''
  })
}

console.log(Susers)
//lOGOUT
  const handlelogout=()=>{
localStorage.removeItem("token");
localStorage.removeItem("name");
navigate('/login')
}

const handleDelete=async(ids)=>{

socket.emit("Delete",{senderid,ids,getid});
socket.on("loadmessage",(getmsg)=>{
  console.log(getmsg)
setchat(getmsg)
})
}

let color={
color:'white',
marginRight:'0%',
backgroundColor:'green',
fontSize:'20px',
borderRadius:'7px',
paddingLeft:'5px',
paddingRight:'5px',
display:'flex',
alignItems:'center',
alignSelf:'flex-end',
justifyContent:'space-between',
gap:'5px'
}
let nocolor={
backgroundColor:'white',
fontSize:'20px',
borderRadius:'7px',
paddingLeft:'5px',
paddingRight:'5px',
display:'flex',
alignItems:'center',
gap:'5px',
justifyContent:'space-between'
}

let usercolor={
width:'80%',
backgroundColor:'white',
border:'0'

}
let nousercolor={
width:'80%'
}

window.onpopstate=()=>{
let resp= confirm('It will make u logout from the page,do you wish to continue?');
 if(resp){
  localStorage.removeItem("token");
localStorage.removeItem("name");
  navigate('/login')
 }
 else{
  navigate('/dashboard')
 }
}

console.log(chat)
  return (
    <>
    <div style={{}}  className='flex  gap-10 flex-col bg-gradient-to-r from-blue-100 to-cyan-100 justify-around max-sm:justify-start max-sm:gap-8 p-2'>
       <nav className='navbar w-full flex items-center justify-between rounded-xl px-2 bg-gradient-to-r from-emerald-400 to-cyan-400'>
      <img src={chatlogo} className='max-sm:w-14'/>
      <h1 className='text-3xl max-sm:text-xl font-bold text-emerald-600'>{name}</h1>
        <div className="button flex gap-3 items-center">
   <button onClick={handlelogout} className='cursor-pointer text-xl max-sm:text-lg px-3 py-1 rounded-xl bg-red-500 text-white'>Logout</button>
    </div> 
    </nav>
    <div className="chatui flex w-full mb-5 justify-center gap-8">
<div className={`leftone py-4 gap-3 rounded-xl flex flex-col items-center  max-sm:h-[600px] max-sm:w-5/6 w-2/6 bg-gradient-to-r from-teal-400 to-yellow-200 ${(show)?'':'max-sm:hidden'} `}>
 <form onSubmit={handleSearch} className='searchbar w-5/6 flex justify-center gap-2'>
        <input className='searchinput border-2 border-black w-4/6 max-lg:w-full p-2 rounded-xl' placeholder='Enter Name...' type="text" name='name' value={Sname.name} onChange={handlename}/>
        <button className='searchbtn w-2/6 rounded-xl bg-black text-white cursor-pointer max-lg:hidden'>Search</button>
      </form>
     {(chatview)?
       <div className='userlist'>
  {users.map((v,i)=>{
      return(
        <div key={i} style={(getid==v._id?usercolor:nousercolor)} onClick={()=>{setid(v._id),setuname(v.name)}} className='flex cursor-pointer items-center border gap-3 h-15  rounded-xl font-medium'>
          <img src={v.image} alt="" className='w-10 rounded-2xl ml-2'/>
          <p className=' text-black text-2xl max-lg:text-xl '>{v.name}</p>
        </div>
      )
    })}
    </div>
     :
    (Susers.length==0)?
    <p>No User Found</p>
    :
<div className='userlist'>
  {Susers.map((v,i)=>{
      return(
        <div key={i} style={(getid==v._id?usercolor:nousercolor)} onClick={()=>{setid(v._id),setuname(v.name)}} className='flex cursor-pointer items-center border gap-3 h-15  rounded-xl font-medium'>
          <img src={v.image} alt="" className='w-10 rounded-2xl'/>
    <p className='cursor-pointer text-black text-2xl max-lg:text-xl ' >{v.name}</p>
        </div>
      )
    })}
    </div>
         }

    </div>
    <div className={`rightone w-3/6 max-lg:w-4/6 max-sm:w-full  max-sm:h-[700px] h-[600px] flex flex-col justify-between p-4  rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-900 ${(show)?'max-sm:hidden':''} `} >
      <div className="bg-white text-black rounded-xl p-2 text-center flex items-center justify-between ">
        <FontAwesomeIcon className='text-2xl min-sm:invisible' icon={faArrowLeft} onClick={()=>setshow(true)+setid(0)}></FontAwesomeIcon>
        <p className='text-2xl font-medium'>{uname}</p>
        <p></p>
      </div>
      <div className='chatarea flex flex-col overflow-auto gap-3 p-2 bg-green-300 max-sm:h-[500px] h-[400px] rounded-xl'> 
        {(show)?
            <div className='flex flex-col items-center h-full justify-center gap-3'>
  <p className='text-3xl max-md:text-2xl font-medium'>Start Conversation By </p>
  <p className='text-3xl max-md:text-2xl font-medium text-blue-500'>Clicking To The User</p>
  <p className='text-3xl max-md:text-2xl font-medium'>Say hii👋</p>
</div>:             
(chat.length!=0&&active)?chat.map((v,i)=>{
  
    return(

(v.deletedFor.includes(senderid))? 
" "
      :
 <div key={i} className='max-lg:w-4/6 max-md:w-5/6 w-3/6' style={(getid==v.RecieverId)?color:nocolor} ref={lastmsgref}>
      <div>
 <p className='max-sm:text-lg' style={{margin:'0px'}}>{v.message}</p>
 <div className="messagetime gap-0">
 <p className='max-sm:text-sm'>{new Date(v.createdAt).toLocaleDateString('en-IN')}</p>
 <p className='max-sm:text-sm'>{new Date(v.createdAt).toLocaleTimeString('en-IN')}</p>
 </div>
</div>
<FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(v._id)}></FontAwesomeIcon>
    </div>
    )
 
}):
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#44061D"></stop><stop offset=".3" stop-color="#44061D" stop-opacity=".9"></stop><stop offset=".6" stop-color="#44061D" stop-opacity=".6"></stop><stop offset=".8" stop-color="#44061D" stop-opacity=".3"></stop><stop offset="1" stop-color="#44061D" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="13" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#44061D" stroke-width="13" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
        } 
      </div>
      <div className='send flex justify-center'>
      <form onSubmit={handleSubmit} className='w-5/6 max-md:w-full flex gap-2'>
        <input className='border-2 border-black w-5/6 max-sm:w-full p-1 rounded-xl' type="text" placeholder='Enter message...' value={datas.message} name='message' onChange={handleInput}/>
        <button className='w-1/6 text-xl max-xl:text-sm max-sm:hidden border-black rounded-xl bg-black text-white cursor-pointer'>Submit</button>
      </form>
      </div>
    </div>
    </div>
    </div>
   
    
    </>
  )
}
