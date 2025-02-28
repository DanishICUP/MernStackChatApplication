import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkeleton'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {

  const { messages, loading } = useGetMessages()
  console.log("MESSAGES", messages)
  
  useListenMessages()

  const lastMessageRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [messages]);



  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>send message to start conversation :</p>
      )}
    </div>
  )
}

export default Messages