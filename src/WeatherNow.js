import React from 'react'

const WeatherNow = ({temparray,value,variable,info}) => {
   
  return (
    <div className='mt-[-40px]'>
<div 
className=" max-[640px]:grid flex-wrap flex text-center p-2 mt-[380px]  justify-around border-2 border-gray-400 items-center mx-2 max-sm:grid grid-cols-2 max-sm:mt-[100px] max-sm:gap-y-[50px] ">
<div>{(value)? info?.main?.feels_like : Math.round(temparray[1])}{variable}<p>Real_Feel</p></div>
<div>{info?.main?.humidity}%<p>Humidity</p></div>
<div>{info?.main?.sea_level}FT<p>Sea_level</p></div>
<div>{(value)? info?.main?.temp_max : Math.round(temparray[3])} {variable}<p>Temp_Max</p></div>
<div>{(value)? info?.main?.temp_min : Math.round(temparray[2])}{variable}<p>Temp_Min</p></div>
<div>{info?.wind?.speed}MPH<p>Wind_Speed</p></div>
</div>
    </div>
  )
}

export default WeatherNow