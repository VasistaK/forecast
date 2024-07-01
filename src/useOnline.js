import { useEffect, useState } from "react";
const useOnline = ()=>{
    const [isOnline,setIsOnline] = useState(true)
useEffect(()=>{
  const online  =   window.addEventListener("online",()=>{setIsOnline(true)})
  const offline =   window.addEventListener("offline",()=>{setIsOnline(false)})
  
  window.removeEventListener("online",online);
  window.removeEventListener("offline",offline)

},[])

return isOnline;
}

export default useOnline;   