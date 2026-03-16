
import './App.css'
import FormField from './FormField';
import './index.css'
import Form from './Form';
import Translate from './translate';
import { Route, Router, Routes } from 'react-router-dom';
import Login from './login';
import Dashboard from './dashboard';
import { createContext, useState } from 'react';
 let Context=createContext();
function App() {
  let url='https://backend-chat-kzg0.onrender.com';
let [Uname,setUname]=useState('hello');
return(
  <>
  <Context.Provider value={{url:url,name:Uname,setUname:setUname}}>
 <Routes>
  <Route path='' element={<Translate></Translate>}></Route>
  <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/Signup' element={<Form></Form>}></Route>
    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
 </Routes>
 </Context.Provider>
    </>
)

}

export default App;
export{Context}
