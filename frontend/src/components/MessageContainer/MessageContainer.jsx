import React, { useState, useEffect } from 'react'
import Messages from './Messages'
import InputBox from './InputBox'
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  // const noChatSelect = true;

  const { SelectedConversation, setSelectedConversation } = useConversation()


  //when i logout and login the conversation is seleted we dont need this when logout and login no chat us select for this 
  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])


  return (
    <div className='hidden md:min-w-[450px] md:flex flex-col'>
      {!SelectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='flex text-center items-center bg-slate-500 px-4 py-2 mb-2'>
            <span className='label text'>To 👩🏾‍🤝‍🧑🏼 </span>
            <span className='text-gray-400 font-bold'> {SelectedConversation.fullname}</span>
          </div>
          <Messages />
          <InputBox />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {

  const { authUser } = useAuthContext()

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-600 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullname}</p>
        <p>Select a chat to start a conversation</p>
        <TiMessages className='text-3xl md:text-6xl text-center items-center' />
      </div>
    </div>
  );
}

export default MessageContainer;
