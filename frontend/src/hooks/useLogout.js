import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogout = () => {

    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const Logout = async () => {
        setLoading(true)
        try {
            const res = await axios.post('/api/auth/logout')
            if (res.data.success) {
                toast.success("Logout successfully");
                localStorage.removeItem("authUser")
                setAuthUser(null)
            } else {
                toast.error(res.data.message || "Logout failed. Please try again.")
            }

        } catch (error) {
            console.log("error in logout hook ", error)

            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong!");
            }
            else if (error.request) {
                toast.error("No response from server. Please check your internet connection.");
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, Logout }
}

export default useLogout