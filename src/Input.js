import React, { useContext } from 'react'

import {useState,useEffect}  from "react";



const Input = ({info,setInfo}) => {
    
    const [suggestions,setSuggestions] = useState([]);

    const [showSuggestions,setShowSuggestions] = useState(false);
   
    const [search,setSearch] = useState("");

    const suggestionurl  = 'https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='

    const getSuggestions = async ()=>{

    const data = await fetch(suggestionurl+search);
     
    const json = await data.json();

    setSuggestions(json[1]);
    
    }

    useEffect(()=>{
     
   const timer = setTimeout(getSuggestions,100);

   return()=>{
    clearTimeout(timer)
   }
    
    },[search])



    async function handleClick(){

         if(search !== ""){
   
       const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Imperial&appid=19e679057b9bcb475f2b0fdccb53c134`)
     
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
    <div className="text-center ">
    <input
    className='outline-none mt-4 border border-gray-400   relative pr-12  bg-transparent' 
    onKeyDown = {(e)=>{ inputHandler(e)}}
    onFocus={()=>{setShowSuggestions(true)}}
    onBlur={()=>{
      const timer = setTimeout(()=>setShowSuggestions(false),300)
       return ()=>{
        clearTimeout(timer)
       }
    }}
    onChange={(e)=>{setSearch(e.target.value)}} 
    value={search}
    placeholder="EnterLocation"
    />
    <button  
    onClick={()=>{handleClick()}} 
           className='border border-gray-400'
    >
    🔍
    </button>
      {  showSuggestions &&
      <div className='flex justify-center'>
              <div className='max-sm:h-[100px] text-start absolute z-10 bg-white text-black  w-[285px] top-12 border border-gray-300 rounded-lg'>
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







