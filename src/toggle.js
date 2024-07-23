import React from 'react'

const Toggle = ({toggle,variable,value}) => {
  return (
<div className='flex justify-center mt-[px]'>
<div className="flex justify-center w-24 border-2 border-white h-12 items-center relative m-2 mx-4"> 
    <span className="left-2  text-white absolute" 
    onClick={toggle}>℉</span>
   {(value)?
   <button className='absolute text-black bg-white left-0 h-full w-[50%]'>
    {variable}
   </button>
   : 
   <button className='z-20 absolute text-black bg-white right-0 h-full w-[50%]'>
    {variable}
   </button>
   }
   <span 
    className="absolute text-white right-2 "
    onClick={toggle}>
    ℃
    </span> 
   </div>
    </div>


  )
}

export default Toggle