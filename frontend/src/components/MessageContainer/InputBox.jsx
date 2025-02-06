import React, { useState } from 'react'
import { BsFillSendPlusFill } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';

const InputBox = () => {

    const [message, setMessage] = useState("")

    const { useSendConversation, loading } = useSendMessage()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return;
        await useSendConversation(message);
        setMessage("")
        console.log(message)
    }

    return (
        <form className='relative px-4 my-3' onSubmit={handleSubmit}>
            <div className='relative w-full'>
                <input
                    type="text"
                    placeholder='Type message here ...'
                    className='w-full block py-3 pr-12 rounded-lg bg-gray-500 text-white'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type='submit'
                    className='absolute inset-y-0 right-3 flex items-center justify-center text-white cursor-pointer'
                >

                    {loading ? <span className='loading loading-spinner'></span> : <BsFillSendPlusFill className='text-xl' />}

                </button>
            </div>
        </form>
    )
}

export default InputBox