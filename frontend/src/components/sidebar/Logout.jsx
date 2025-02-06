import React from 'react'
import { RiLogoutBoxFill } from "react-icons/ri";
import useLogout from '../../hooks/useLogout';

const Logout = () => {

  const {loading , Logout} = useLogout()

  return (
    <div className='mt-auto overflow-hidden '>

    {!loading ? (
      <button className='bg-transparent rounded-full p-3 cursor-pointer outline-none'>
      <RiLogoutBoxFill className='w-7 h-7 outline-none' 
        onClick={Logout}
      />
    </button>   
    ) : (
      <span className='loading loading-spinner'></span>
    )}

</div>
  )
}

export default Logout