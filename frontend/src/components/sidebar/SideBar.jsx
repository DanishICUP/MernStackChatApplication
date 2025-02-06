import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import Logout from './Logout'

const SideBar = () => {
  return (
    <div>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        <div className='divider px-3'></div>
        <Logout/>
    </div>
  )
}

export default SideBar