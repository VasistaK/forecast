import React from 'react'

const Toggle = ({toggle,variable,value}) => {
  return (
<div className='flex justify-center mt-[px]'>
<div className="flex justify-center w-24 border-2 border-white h-12 items-center relative m-2 mx-4"> 
    <span className="left-1 p-2  text-black absolute duration-300 ease-in-out" 
    onClick={toggle}>℃</span>   
   {(value)?
   <button className='  bg-white ml-[46px] h-full w-[50%] duration-300 ease-in-out'>
    {variable}
   </button>
   : 
   <button className=' bg-white mr-[46px] h-full w-[50%] duration-300 ease-in'>
    {variable}
   </button>
   }
   <span 
    className="absolute text-black right-1 p-2 duration-300 ease-in-out "
    onClick={toggle}>
  ℉
    </span> 
   </div>
    </div>


  )
}

export default Toggle