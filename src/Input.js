import React from 'react'

import {useState,useEffect}  from "react";

const Input = ({info,setInfo}) => {

    const [search,setSearch] = useState("");

    async function handleClick(){

        if(search){
   
       const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Imperial&appid=19e679057b9bcb475f2b0fdccb53c134`)
     
       const json  = await data.json();
       
       setInfo(json);
     
     console.log(json);
     
        }
     }
          

     function inputHandler(e){
        if(e.key === "Enter"){
        return handleClick()
    }
     }



  return (
    <div className="flex justify-center text-white m-0 max-sm:flex-wrap">
    <input 
    className='max-[400px]:flex-1 bg-transparent border-2 border-white m-2 p-1 '
    onKeyDown={(e)=>{inputHandler(e)}} 
    onChange={(e)=>{setSearch(e.target.value)}} 
    placeholder="EnterLocation"/>
        
    <button 
    onClick={handleClick} 
    className="align-middle ml-[-88px] border-l-2 h-[38px] px-2 mt-[9px] " 
    >
    Search
    </button>
       </div>
  )
}

export default Input







