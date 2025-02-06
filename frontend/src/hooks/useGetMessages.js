import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import axios from 'axios';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, selLoading] = useState(false);
    const { messages, setMessages, SelectedConversation } = useConversation();

    useEffect(() => {
        const GetConversation = async () => {
            selLoading(true);
            try {
                if (!SelectedConversation?._id) return;

                const res = await axios.get(`/api/message/${SelectedConversation._id}`);
                console.log("Fetched Messages:", res.data);

                if (res.data.error) {
                    throw new Error(res.data.error);
                }

                setMessages(res.data);
            } catch (error) {
                console.error("Error fetching messages:", error.message);
                toast.error(error.message);
            } finally {
                selLoading(false);
            }
        };

        if (SelectedConversation?._id) GetConversation();

    }, [SelectedConversation?._id]);

    return { messages, loading };
};

export default useGetMessages;
