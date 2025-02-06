import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useSideBarUser from '../../hooks/useSideBarUser';
import toast from 'react-hot-toast';

const SearchInput = () => {

  const [Search, setSearch] = useState("")

  const { setSelectedConversation } = useConversation()
  const { conversations } = useSideBarUser()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!Search) return;
    if (Search.length < 3) {
      toast.error("search term must be 3 character long ")
    }

    //search alo
    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(Search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")
    }else{
      toast.error("No User found !")
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <div className='flex text-center items-center gap-2 mt-3 ml-2'>
        <input type="text" placeholder='Search here ' className='input rounded-md w-full outline-0'
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='btn btn-circle bg-sky-400 hover:bg-sky-300 '>
          <FaSearch className='w-6 h-6 outline-none' />
        </button>
      </div>
    </form>
  )
}

export default SearchInput