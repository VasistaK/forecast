import React from 'react'

const Main = ({info,value,variable,temparray}) => {

  return (
    
<div className="flex justify-around mt-4">
<div className=" "> 
<p> {info?.name} </p>
<p>{(value)? `${info?.main?.temp} ${variable}` : `${Math.round((temparray[0]))} ${variable}`} </p>
</div>
<div className="weather-description rotate-[270deg]">
  {info?.weather?.map(x=>x.main)}
</div>  
</div>


  )
}

export default Main;