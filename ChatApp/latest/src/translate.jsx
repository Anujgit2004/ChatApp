import React from 'react'
import { useEffect, useState } from 'react';
import img from "./assets/icons8-exchange-96.png";
import { Link, useNavigate } from 'react-router-dom';
export default function Translate() {
   let navigate=  useNavigate();
  let [output, setoutput] = useState('');
  const translateText = async (text, targetLang, raw) => {
    const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'e843ea22bdmsh70d85a8cf545ce9p1f4ee1jsn61dceb2d05fa',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
      },
      // e843ea22bdmsh70d85a8cf545ce9p1f4ee1jsn61dceb2d05fa
      body: JSON.stringify({
        q: text,
        source: raw,
        target: targetLang
      })
    };



    const response = await fetch(url, options);
    const returns = await response.json();
    setoutput(returns.data.translations.translatedText[0]);

  };


  let [input1, setinput1] = useState('');
  let [code1, setcode1] = useState('');
  let [code2, setcode2] = useState('');


  const handlename = (e) => {
    setinput1(e.target.value)
  }
  const handlecode1 = (e) => {
    setcode1(e.target.value);
  }
  const handlecode2 = (e) => {
    setcode2(e.target.value);
  }
  console.log(code1, code2)
  // const handlecode=(e)=>{
  // setoriginal(e.target.value)
  // }

  const handlesubmit = (e) => {
    e.preventDefault()
   translateText(input1, code2, code1);
    
  }



  return (
    <>
    <div className="button" style={{display:'flex',justifyContent:'flex-end',gap:'1rem'}}>
     <Link to={'/login'}> <button style={{padding:'5px',borderRadius:'5px'}}>Login</button></Link>
     <Link to={'/Signup'}> <button style={{padding:'5px',borderRadius:'5px'}}>Signup</button></Link> 
    </div>
<h1 style={{textAlign:'center'}}>Text Translator App</h1>

      <form action="#" onSubmit={handlesubmit} style={{display:"flex",flexDirection:"column", gap:"10px",alignItems:"center"}}>

        <div className="Translation-sec" style={{ display: "flex",alignItems:"center", gap:"1rem",border:"1px solid white",padding:"10px" }}>
          <div className="Source-area" style={{ width: "300px", height: "150px", border: "1px solid white", display: 'flex', flexDirection: "column", padding: "10px", justifyContent: "space-around"}}>
            <select name="lang" onChange={handlecode1} style={{fontSize:"15px",padding:"5px"}} >
              <option value="">Select Language</option>
              <option value="en" >English</option>
              <option value="hi" >Hindi</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ar">Arabic</option>
              <option value="zh">Chinese</option>
              <option value="es">Spanish</option>
              <option value="it">Italian</option>
              <option value="ja">Japenese</option>
            </select>
            <textarea name="Text" rows={'4'} placeholder='Enter Text' onChange={handlename} style={{fontSize:"15px",padding:"5px"}} ></textarea>
          </div>

<img src={img} alt="" height={"80px"}/>
          <div className="target-area" style={{ width: "300px", height: "150px", border: "1px solid white", display: 'flex', flexDirection: "column", padding: "10px", justifyContent: "space-around" }}>
            <select name="langs" onChange={handlecode2} style={{fontSize:"15px",padding:"5px"}} >
              <option value="">Select Language</option>
              <option value="en" >English</option>
              <option value="hi" >Hindi</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ar">Arabic</option>
              <option value="zh">Chinese</option>
              <option value="es">Spanish</option>
              <option value="it">Italian</option>
              <option value="ja">Japenese</option>
            </select>
            <textarea name="translated-text" rows={'4'} placeholder='Translated Text' value={output} style={{fontSize:"15px",padding:"5px"}} ></textarea>
          </div>
        </div>


        <input type="submit" value={"Translate"} style={{padding:"5px", fontSize:"15px",width:"80px"}}/>
      </form>
    </>
  )
}
