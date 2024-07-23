
import { useEffect, useState } from "react";

import coords from "./coords";

import useOnline from "./useOnline";


export const Body = ()=>{

  const [lat,lon] = coords();

  const [variable,setVariable] = useState("℃");

  const [value,setValue] = useState(false);

const isOnline = useOnline();

const [info,setInfo] = useState("");

const [search,setSearch] = useState("");


    async function handleClick(){

     if(search){

    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Imperial&appid=19e679057b9bcb475f2b0fdccb53c134`)
  
    const json  = await data.json();
    
    setInfo(json);
  
  console.log(json);
  
     }
  }
       
async function Data (){

  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Imperial&appid=19e679057b9bcb475f2b0fdccb53c134`);

    const json  = await data.json();
    
    setInfo(json);
  
} 


useEffect(()=>{
  if(lat&&lon){
  Data();
}},[lat&&lon]);


 function toggle (){

setValue(!value);
setVariable(value?"℃":"℉"); 
 }

function ftoc(){
return[(this.temp-32)*5/9,(this.feelslike-32)*5/9,(this.maxtemp-32)*5/9,(this.maxtemp-32)*5/9]
}

const objtemp = {
temp : info?.main?.temp,
feelslike:info?.main?.feels_like,
mintemp:info?.main?.temp_min,
maxtemp:info?.main?.temp_max,
}

const temparray = ftoc.call(objtemp);



// console.log(temparray[0]);



return (isOnline)? (
  <>
<div  className=" h-[100vh] bg-cover text-white font-mono font-bold text-xl max-sm:bg-cover bg-[url('https://t4.ftcdn.net/jpg/02/78/52/07/360_F_278520748_G9sRQdSValj67Hihmt4r3ji6SLRT3ViA.jpg')]">
<div  className="flex justify-center pt-4 max-sm:flex-wrap">
    <div className="flex justify-between">
  <input onKeyDown={(e)=>{if(e.key === "Enter"){
     return handleClick()
    }}} placeholder="EnterLocation" className="relative bg-transparent h-12  px-2  border-2 border-gray-300" onChange={(e)=>{setSearch(e.target.value)}}/>
      
                      {/* searchbutton */}
     <button onClick={handleClick} className="items-center border-l-2 absolute border-gray-300 top-4 ml-40 pl-3  h-12 " >
        Search
     </button>
    
     </div>


                     {/* togglebtn */}
     
          <div className=" max-sm:mt-2  border-2  border-white flex- ml-3 relative flex justify-between items-center"><span className=" pl-3 p-[8px] w-full h-full duration-200 ease-in-out" onClick={toggle}>℃</span>
     {(value)? 
     <button className=" absolute bg-white h-full w-[50%] text-black ml-[50%] ease-linear duration-200" >{variable}</button> :
      <button className="bg-white h-full w-[50%] mr-[50%] text-black duration-200 ease-linear absolute" >{variable}</button>
       } <span className="h-full w-[full] pr-2 p-[8px] mr-2 " onClick={toggle}>℉</span> </div>
     </div>

     {(info.message === 'city not found')?<h3>No Data Found</h3>:
     <>
     <div className="">
<div className="flex justify-around mt-4">
<div className=" "> 
<p> {info?.name} </p>
<p>{(value)? `${info?.main?.temp} ${variable}` : `${Math.round((temparray[0]))} ${variable}`} </p>
</div>
<div className="weather-description rotate-[270deg]">
  {info?.weather?.map(x=>x.main)}
</div>  
</div>
                        {/* weather now section */}
<div className="flex text-center p-2 mt-[370px]  justify-around border-2 border-gray-400 items-center mx-2 max-sm:grid grid-cols-2 max-sm:mt-[100px] max-sm:gap-y-[50px] ">
<div>{(value)? info?.main?.feels_like : Math.round(temparray[1])}{variable}<p>Real_Feel</p></div>
<div>{info?.main?.humidity}%<p>Humidity</p></div>
<div>{info?.main?.sea_level}FT<p>Sea_level</p></div>
<div>{(value)? info?.main?.temp_max : Math.round(temparray[3])} {variable}<p>Temp_Max</p></div>
<div>{(value)? info?.main?.temp_min : Math.round(temparray[2])}{variable}<p>Temp_Min</p></div>
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
      
