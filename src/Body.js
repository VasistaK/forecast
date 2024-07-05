import { useEffect, useState } from "react";

import useOnline from "./useOnline";

export const Body = ()=>{

const isOnline = useOnline();

const [info,setInfo] = useState("");

const [city] = useState("Delhi")

const [search,setSearch] = useState("");


//    async function getData (){

//     if(search||city){

// const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search||city}&units=metric&appid=19e679057b9bcb475f2b0fdccb53c134`)

// const json  = await data.json();

// setInfo(json);

// // console.log(json)

// console.clear()

// }
//    }
//  useEffect(()=>{ getData()},[search])

    async function handleClick(){
    
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=19e679057b9bcb475f2b0fdccb53c134`)
    
    const json  = await data.json();
    
    setInfo(json);
    
    console.log(json)
    
    console.clear()
    
    }
       
        useEffect(()=>async function Data (){
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${"Delhi"}&units=metric&appid=19e679057b9bcb475f2b0fdccb53c134`)
            
            const json  = await data.json();
            
            setInfo(json);
            
            console.log(json)
            
            console.clear()
            
            },[null])


return (isOnline)? (
  
<div className="AppPage">

<div className="search-box">
    <input type="search"  value={search} placeholder="Search" onChange={(e)=>{setSearch(e.target.value)}}/>
    <button class="search-btn"  onClick={handleClick}>
        <img src="https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Magnifier-Search-Zoom--64.png"/>
    </button>
</div>

<div className="weathercard">

<div></div>
{(info.message === 'city not found' ) ?<h3 className="NoData">No Location Found</h3>:
<div>
<div className="city-temp">
  <div>  
 <div class="city-country">   
  {(info?.name&&info?.sys?.country ) ? <div class="city-country">   {info?.name} {(info?.sys?.country)}</div> :<h2> Loading </h2>}
</div>
<div class="temp">
{info?.main?.temp}℃
</div>
</div>

<div className="description">
<div >
    {info.weather?.map(x=>x.description)}
</div>

</div>

</div>


<div className="climate-info">

<div className="wind">
   {info?.wind?.speed} MPH<p>WindSpeed</p>
</div>

<div className="min-temp">
    {info?.main?.temp_min}℃
     <p>Min_Temp</p>
</div> 

<div className="max-temp">
        {info?.main?.temp_max}℃
         <p>Max_Temp</p>
</div>

<div className="humidity">
        {info?.main?.humidity}%
        <p>Humidity</p>
</div>

<div className="sealevel">
        {info?.main?.sea_level}FT
        <p>sea_level</p>
</div>

<div className="feels-like">
        {info?.main?.feels_like}℃
        <p>feels_like</p>
</div>

</div>

</div>

}



</div>

</div>
)
 :<h3>No Internet Connection Found</h3>     
}
