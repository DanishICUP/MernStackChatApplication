import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const useSendMessage = () => {
  const [loading, selLoading] = useState(false)
  const { messages, setMessages, SelectedConversation } = useConversation()

  const useSendConversation = async (message) => {
    selLoading(true);
    try {

      if (!SelectedConversation?._id) {
        toast.error("No conversation selected!")
        return;
      }

      const res = await axios.post(`/api/message/send/${SelectedConversation._id}`, {
        message
      })
      console.log(res)
      if (res.data.error) {
        toast.error("SomeThing went wrong wait " || res.data.error)
        throw new Error(error.message)
      }

      setMessages([...messages, res.data.newMesages]);


    } catch (error) {
      console.log(error.message);

    } finally {
      selLoading(false)
    }
  }

  return { loading, useSendConversation }
}

export default useSendMessage