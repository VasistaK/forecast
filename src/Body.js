
import { useEffect, useState } from "react";

import coords from "./coords";

import useOnline from "./useOnline";

import Input from "./Input";

import Main from "./Main";

import WeatherNow from "./WeatherNow";

import Toggle from "./toggle";

export const Body = ()=>{

  const [lat,lon] = coords();

  const [variable,setVariable] = useState("℃");

  const [value,setValue] = useState(false);

const isOnline = useOnline();

const [info,setInfo] = useState("");

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

<div  className="">
     
     <Input setInfo={setInfo}/>
                  
     <Toggle value = {value} variable={variable} toggle={toggle}/>

     {(info.message === 'city not found')?<h3>No Data Found</h3>:
     
     <>
   
     <Main info={info} value={value} variable={variable} temparray={temparray}/>

     <WeatherNow temparray={temparray} value={value} variable={variable} info={info}  />
 
<div className="font-extrabold flex justify-center text-3xl mt-9">OverDrop</div>
</>
}

</div>
</div>

</>
     
)
 :<h3>No Internet Connection Found</h3>     
    }
      
