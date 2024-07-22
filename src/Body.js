
import { useEffect, useState } from "react";

import coords from "./coords";

import useOnline from "./useOnline";

export const Body = ()=>{

  const [lat,lon] = coords();

const isOnline = useOnline();

const [info,setInfo] = useState("");

const [search,setSearch] = useState("");


    async function handleClick(e){
    if(search){
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=19e679057b9bcb475f2b0fdccb53c134`)
    
    const json  = await data.json();
    
    setInfo(json);
    
    console.log(json)}
    
    }   


    

async function Data (){
  
  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=359bfba36167323649f32da1a32e3d42`)
            
  const json  = await data.json();
  
  setInfo(json);

} 

useEffect(()=>{
  if(lat&&lon){
  Data()}},[lat&&lon])

return (isOnline)? (
  <>
<div className="h-[100vh] bg-cover text-white font-mono font-bold text-xl max-sm:bg-cover bg-[url('https://t4.ftcdn.net/jpg/02/78/52/07/360_F_278520748_G9sRQdSValj67Hihmt4r3ji6SLRT3ViA.jpg')]">
<div  className="flex justify-center pt-4">
    <input onKeyDown={(e)=>{if(e.key === "Enter"){
     return handleClick()
    }}} placeholder="EnterLocation" className=" bg-transparent h-12 w-72 px-2  border-2 border-gray-300" onChange={(e)=>{setSearch(e.target.value)}}/>
     <button className="border-l-2 border-gray-300 ml-[-85px] p-2" onClick={handleClick}>
        Search
     </button>
     </div>
     {(info.message === 'city not found')?<h3>No Data Found</h3>:
     <>
     <div className="">
<div className="flex justify-around mt-4">
<div className=" "> 
<p>{info?.name} </p>
<p>{info?.main?.temp}℃</p>
</div>
<div className="weather-description rotate-[270deg]">
  {info?.weather?.map(x=>x.main)}
</div>
</div>
<div className="flex text-center p-2 mt-[370px]  justify-around border-2 border-gray-400 items-center mx-2 max-sm:grid grid-cols-2 max-sm:mt-[100px] max-sm:gap-y-[50px] ">
<div>{info?.main?.feels_like}℃<p>Real_Feel</p></div>
<div>{info?.main?.humidity}%<p>Humidity</p></div>
<div>{info?.main?.sea_level}FT<p>Sea_level</p></div>
<div>{info?.main?.temp_max}℃<p>Temp_Max</p></div>
<div>{info?.main?.temp_min}℃<p>Temp_Min</p></div>
<div>{info?.wind?.speed}MPH<p>Wind_Speed</p></div>
</div>
</div>
<div className="font-extrabold flex justify-center text-3xl mt-9">OverDrop</div>
</>
}
</div>
</>

)
 :<h3>No Internet Connection Found</h3>     
    }
    
