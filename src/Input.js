import React, { useContext } from 'react'

import {useState,useEffect}  from "react";



const Input = ({info,setInfo}) => {
    
    const [suggestions,setSuggestions] = useState([]);

    const [showSuggestions,setShowSuggestions] = useState(false);
   
    const [search,setSearch] = useState("");

    const suggestionurl  = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='

    const getSuggestions = async ()=>{

    const data = await fetch(suggestionurl+search);
     
    const json = await data.json();

    setSuggestions(json[1]);
    
    }

    useEffect(()=>{
     
   const timer = setTimeout(getSuggestions,300);

   return()=>{
    clearTimeout(timer)
   }
    
    },[search])



    async function handleClick(){

         if(search !== ""){
   
       const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=Imperial&appid=19e679057b9bcb475f2b0fdccb53c134`)
     
       const json  = await data.json();
       
       setInfo(json);
   }
}



     
                      //enter button function
     function inputHandler(e){
      if(e.key === "Enter"){
        return handleClick();
    }
     }
    
  return (

    <div>
    <div className="text-center text-white">
    <input 
    onKeyDown = {(e)=>{ inputHandler(e)}}
    onFocus={()=>{setShowSuggestions(true)}}
    onBlur={()=>{
      const timer = setTimeout(()=>setShowSuggestions(false),300)
       return ()=>{
        clearTimeout(timer)
       }
    }}
    className='relative capitalize max-[400px]:flex-1 bg-transparent border-2 border-white m-2 p-1 '
    onChange={(e)=>{setSearch(e.target.value)}} 
    value={search}
    placeholder="EnterLocation"/>
    <button  
    onClick={()=>{handleClick()}} 
    className="align-middle relative ml-[-88px] border-l-2 h-[38px] pl-1 pr-3 mb-[2px] " 
    >
    Search
    </button>
      {  showSuggestions && 
      <div className='flex justify-center'>
              <div className='text-start absolute z-10 bg-white text-black  w-[247px] top-12 border border-gray-300 rounded-lg'>
        <ul>
            {
     suggestions.map((s,id)=>{return <li key={id} onClick={()=>setSearch(s)}>{s}</li>})
            }
        </ul>
       </div>
       </div>
     }


    </div>
   
       </div>
  )
}

export default Input







