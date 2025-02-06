import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const useSideBarUser = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversation] = useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await axios.get('/api/sidebaruser/');
                if (!res) {
                    console.log(error)
                    toast.error(res.data.message)
                    throw new Error(res.error)
                }

                setConversation(res.data.filterUser);
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    }, [])

    return { loading, conversations }
}

export default useSideBarUser