import { useEffect, useState } from "react";

import useOnline from "./useOnline";

export const Body = ()=>{

const isOnline = useOnline();

const [info,setInfo] = useState("");

const [city] = useState("Delhi")

const [search,setSearch] = useState("");

const [weather,setWeather] = useState("https://cdn3.iconfinder.com/data/icons/agriculture-196/64/934.png")


    async function handleClick(){
    
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=19e679057b9bcb475f2b0fdccb53c134`)
    
    const json  = await data.json();
    
    setInfo(json);
    
    console.log(json)
    
    // console.clear()
    


    }   


      const Icon = ()=>{
      if(info?.weather?.map(x=>x.main) =='Clouds'){
        setWeather("https://cdn4.iconfinder.com/data/icons/weather-129/64/weather-2-64.png");
        console.log("cloudy");
      }
      else if(info?.weather?.map(x=>x.main)=='Haze'){
        setWeather("https://cdn4.iconfinder.com/data/icons/linecon/512/cloud-64.png");
        console.log("Haze");
      }
      else if(info?.weather?.map(x=>x.main)=='Clear'){
        setWeather("https://cdn3.iconfinder.com/data/icons/agriculture-196/64/934.png");
        console.log("clear");
      }
      else if(info?.weather?.map(x=>x.main) == 'Rain'){
        setWeather("https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_7-64.png");
        console.log("Rain");
      }}


      useEffect(()=>{Icon()},[handleClick])


        useEffect(()=>async function Data (){

            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${"Delhi"}&appid=19e679057b9bcb475f2b0fdccb53c134`)
            
            const json  = await data.json();
            
            setInfo(json);

            console.clear()

            },[null])

return (isOnline)? (

<>
<div className="search-container">
    <input placeholder="Enter Location" onChange={(e)=>{setSearch(e.target.value)}}/>
     <button onClick={handleClick}>
        Search
     </button>
     </div>
     {(info.message === 'city not found')?<h3>No Data Found</h3>:
     <>
<div className="city-temperature-container">
<div>
<p>{info?.name} <img src={weather} alt="icon"/></p>
<p>{info?.main?.temp}℉</p>

</div>
<div className="weather-description">
  {info?.weather?.map(x=>x.main)}
</div>
</div>

<div className="weather-now">
<div>{info?.main?.feels_like}℉<p>Real_Feel</p></div>
<div>{info?.main?.humidity}%<p>Humidity</p></div>
<div>{info?.main?.sea_level}FT<p>Sea_level</p></div>
<div>{info?.main?.temp_max}℉<p>Temp_Max</p></div>
<div>{info?.main?.temp_min}℉<p>Temp_Min</p></div>
<div>{info?.wind?.speed}MPH<p>Wind_Speed</p></div>
</div>
   <div className="Title">OverDrop</div>
   </>
}</>
)
 :<h3>No Internet Connection Found</h3>     
    }
