import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, emoji, lastIdx }) => {

    const { SelectedConversation, setSelectedConversation } = useConversation()

    const isSelected = SelectedConversation?._id === conversation._id;

    const { onlineUsers } = useSocketContext()

    const isOnline = onlineUsers.includes(conversation._id)


    return (
        <div className={`flex gap-2 items-center hover:bg-sky-500 p-4 py-1 cursor-pointer leading-4 mt-3 ${isSelected ? "bg-sky-500" : ""}`}
            onClick={() => setSelectedConversation(conversation)}
        >

            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src={conversation.profilePic} alt="avatar image" />
                </div>

                {/* Green dot for online users */}
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
            </div>


            
            <div className='flex flex-1 flex-col'>
                <div className='flex gap-3 justify-between'>
                    <p>{conversation.fullname}</p>
                    <span>{emoji}</span>
                </div>
            </div>

            {!lastIdx && <div className='divider px-3 '></div>}

        </div>
    )
}

export default Conversation