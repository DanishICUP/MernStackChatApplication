import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'

const Message = ({ message }) => {


    const { authUser } = useAuthContext()
    const { SelectedConversation } = useConversation()
    const fromMe = message.senderId === authUser._id
    const chatClassMe = fromMe ? "chat-end" : "chat-start"
    const profilePic = fromMe ? authUser.profilePic : SelectedConversation?.profilePic
    const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-500"

    //console.log("Auth User ID:", authUser._id, "Message Sender ID:", message.senderId);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };


    return (
        <div>
            <div className={`chat ${chatClassMe}`}>
                <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                        <img src={profilePic} alt="" />
                    </div>
                </div>

                <div className={`chat-bubble text-white ${bubbleColor} pb-2`}>{message.message}</div>
                <div className='chat-footer text-sm opacity-50 flex px-3 items-center bg-white text-gray-700'>{formatTime(message.createdAt)}</div>

            </div>
        </div>
    )
}

export default Message