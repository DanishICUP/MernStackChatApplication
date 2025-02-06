import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import MessageContainer from '../../components/MessageContainer/MessageContainer'

const Home = () => {
  return (
    <div className='flex h-[450px] sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-blur-sm bg-opacity-0'>
        <SideBar/>
        <MessageContainer/>
    </div>
  )
}

export default Home