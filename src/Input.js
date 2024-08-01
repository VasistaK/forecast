
import { logDOM, render } from '@testing-library/react';
import { click } from '@testing-library/user-event/dist/click';

import React, { useContext } from 'react'

import {useState,useEffect}  from "react";

const Input = ({info,setInfo}) => {
    
    const [suggestions,setSuggestions] = useState([]);
    // console.log(suggestions);

    const [showSuggestions,setShowSuggestions] = useState(false);
   
    const [displaySugeestions,setDisplaySuggestions] = useState([]);

    const [search,setSearch] = useState("");


    const city  = async()=>{

      
      const data =  await fetch(`https://place-autocomplete1.p.rapidapi.com/autocomplete/json?input=${search}&radius=`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'eaea22f191mshef282674e997d4dp100126jsnc78f9591f688',
            'x-rapidapi-host': 'place-autocomplete1.p.rapidapi.com'
          }
        }
      )

      const json = await data.json();
    
       setSuggestions(json.predictions.map(x=>x.description));

       console.log(json);
      }
  
const filterCities = (search)=>{

  const output = suggestions?.filter((y)=>{ return y.toLowerCase()?.includes(search.toLowerCase())});
console.log(output);
 
    setDisplaySuggestions(output);


  
}


useEffect(()=>{city()},[search])
   

   async function handleClick(search){
   
    setSearch(search)

    if(search !== ""){
       
       const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Imperial&appid=19e679057b9bcb475f2b0fdccb53c134`)
     
       const json  = await data.json();
       
       setInfo(json); 

    }
}

                      //enter button function
     function inputHandler(e){
      if(e.key === "Enter"){
        return handleClick(search);
    }
     }


  return (
    <div>
    <div className="text-center ">
    <input
    className='capitalize outline-none mt-4 border border-gray-400   relative pr-5  bg-transparent' 
    onKeyDown = {(e)=>{ inputHandler(e)}}
    onFocus = {()=>{setShowSuggestions(true);city()}}
    onBlur = {()=>{
      const timer = setTimeout(()=>setShowSuggestions(false),300)
       return ()=>{
        clearTimeout(timer);
       }
    }}
    onChange={(e)=>{return [setSearch(e.target.value),filterCities(e.target.value)]}} 
    value={search}
    placeholder="EnterLocation"
    />
    <button  
    onClick={()=>{handleClick(search)}} 
           className='border border-gray-400'
    >
    🔍
    </button>
      {  showSuggestions &&
      <div className='flex justify-center'>
              <div className='max-sm:h-fit text-start absolute z-10 bg-white text-black  w-[285px] top-12 border border-gray-300 rounded-lg'>
        <ul>
            {
          displaySugeestions.map((x,i)=><li key={i} onClick={()=>handleClick(x)}>{x}</li>)
            }
        </ul>
       </div>
       </div>
     }


    </div>
   
       </div>
  )
}

export default Input;