import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client';
import './App.css'
import { Context } from './App';
export default function Dashboard() {



 let{name,setUname,URL}= useContext(Context)

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
let getallmessage=await fetch(`${URL}/auth/${getid}`);
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
let sendMessage=await fetch(`${URL}/auth/send/${getid}`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(datas)
})
console.log(getid)
await fetchs();
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
navigate('/login')
}

 
console.log(getmessage)

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
width:'80%',
backgroundColor:'black' ,
padding:'5px',
borderRadius:'10px'
}
let nousercolor={
width:'80%'
}


let iterate= getmessage.map((v,i)=>{
  return(
    <div key={i} style={(getid==v.RecieverId)?color:nocolor}>
 <p style={{margin:'0px'}}>{v.message}</p>
 <div className="messagetime">
 <p style={{margin:'0px'}}>{new Date(v.createdAt).toLocaleDateString('en-IN')}</p>
 <p style={{margin:'0px'}}>{new Date(v.createdAt).toLocaleTimeString('en-IN')}</p>
 </div>

    </div> 
  )
})



  return (
    <>
    <div className="upperpart">
    <h1 style={{margin:'0px',color:'rgba(80, 213, 3, 0.88)',}}>ChatApp</h1>
     <button onClick={handlelogout} style={{padding:'10px',borderRadius:'10px',border:'none',marginBottom:'5px',backgroundColor:'red',color:'white'}}>Logout</button>
    </div>
    <div className="chatui">
<div className='leftone'>

 <form onSubmit={handleSearch} className='searchbar'>
        <input className='searchinput'  type="text" name='name' value={Sname.name} onChange={handlename}/>
        <input className='searchbtn' type="Submit" value={'Search'}/>
      </form>
     {(Susers.length==0)?
    <div className='userlist'>
  {users.map((v,i)=>{
      return(
        <div key={i} style={(getid==v._id?usercolor:nousercolor)}>
          <p style={{color:'white',fontSize:'25px',cursor:'pointer',margin:'0px'}} onClick={()=>{setid(v._id),setuname(v.name)}}>{v.name}</p>
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
    <div className="rightone">
      <div className="navbar">
        <p>{uname}</p>
      </div>
      <div className='chatarea'>   
        {       
(getmessage.length!=0&&active)?iterate:
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#44061D"></stop><stop offset=".3" stop-color="#44061D" stop-opacity=".9"></stop><stop offset=".6" stop-color="#44061D" stop-opacity=".6"></stop><stop offset=".8" stop-color="#44061D" stop-opacity=".3"></stop><stop offset="1" stop-color="#44061D" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="13" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#44061D" stroke-width="13" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
        }   

      </div>
      <div className='send'>
      <form onSubmit={handleSubmit} className='messageblock'>
        <input className='textarea' type="text" name='message' value={datas.message} onChange={handleInput}/>
        <input className='sendbtn' type="Submit" value={'Send'}/>
      </form>
      </div>
    </div>
    </div>
    
    </>
  )
}
