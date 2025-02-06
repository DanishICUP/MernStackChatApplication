import React from 'react'
import Conversation from './Conversation'
import useSideBarUser from '../../hooks/useSideBarUser'
import getRandomEmoji from '../../utils/Emoji';

const Conversations = () => {

  const { loading, conversations } = useSideBarUser();
  // console.log("CONVERSATIONS DATA", conversations)

  return (

    <div className='py-2 flex flex-col h-[55%] sm:h-[60%] overflow-auto'>
      {conversations.map((conversation, idX) => (
        <Conversation
          key={conversation._id} // 
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idX === conversations.length - 1} // 
        />
      ))}


      {loading ? <span className='loading loading-spinner mx-auto w-10 h-10'></span> : null}


    </div>
  )
}

export default Conversations