import React, { useEffect,useState } from 'react'

const Coords = () => {
    const [lat,setLat] = useState();
    const [lon,setLon] = useState();
    
    function geoLocation (){
        navigator.geolocation.getCurrentPosition((position)=>{
           setLat(position.coords.latitude);
           setLon(position.coords.longitude);
        })
      }

useEffect(()=>{
   geoLocation();
},[])
return  [lat,lon]
}

export default Coords;