import React, { useState } from 'react'

export default function FormField() {
    let[store,setstore]=useState({
        name:'',
        email:'',
        pass:''
    });
    let[newstore,setnew]=useState([]);
    const handledata=(e)=>{  
      let prod={...store} 
let getname=e.target.name;
let getvalue=e.target.value;
prod[getname]=getvalue;
setstore(prod)
 }


  
 const handlesubmit=async(e)=>{
    e.preventDefault();
      let api=[...newstore,store];
  setnew(api)
    setstore({
       name:'',
        email:'',
        pass:''
    })
  
} 
  console.log(newstore)
  return (
    <>
    <form action="#" onSubmit={handlesubmit}>
        <label>Enter name</label>
      <input type="text" name='name' value={store.name} onChange={handledata}/>
      <label>Enter Email</label>
      <input type="email" name='email' value={store.email} onChange={handledata}/>
      <label>Password</label>
      <input type="password" name='pass' value={store.pass} onChange={handledata}/>
      <input type="submit" value={"submit"} />
      </form>
    </>
  )
}
