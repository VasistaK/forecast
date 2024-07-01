import { useEffect, useState } from "react";

import {FaTemperatureArrowDown,FaWind,FaTemperatureArrowUp,FaTemperatureThreeQuarters } from "react-icons/fa6";

import { FaLocationDot } from "react-icons/fa6";


import useOnline from "./useOnline";

export const Body = ()=>{

const isOnline = useOnline();

const [info,setInfo] = useState("");

const [search,setSearch] = useState("");

   async function getData (){

    if(search){

const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=19e679057b9bcb475f2b0fdccb53c134`)

const json  = await data.json();

setInfo(json);

console.clear()

}
}

//weather[0].description
   useEffect(()=>{

    getData();

},[search])

return (isOnline)? (
  
<div className="AppPage">

<div className="weathercard">


<input type="search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>

{info.message === "city not found"? <h3 className="NoData">No data found</h3>:
<>

<div className="city"><FaLocationDot />{info?.name} {(info?.sys?.country)}</div>

<div className="temp"><FaWind />{info?.wind?.speed} MPH</div>

<div className="description">{info.weather?.map(x=>x.description)}</div>

<div className="temp"><FaTemperatureThreeQuarters/>{info?.main?.temp}℃</div>

<div className="temp-spec">

<div className="min-temp"><FaTemperatureArrowDown/> {info?.main?.temp_min}℃</div> <div className="temp-max"><FaTemperatureArrowUp/> {info?.main?.temp_max}℃</div>

</div>
</>

}



</div>

</div>
)
 :<h3>No Internet Connection Found</h3>     
}