import React, { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const Login = async (username, password) => {

        const success = handleError(username, password);
        if (!success) return; 
        setLoading(true)
        try {
            const res = await axios.post('/api/auth/login', { username, password })
            console.log(res)

            const success = handleError(username , password);
            if(!success) return;

            if (res.data.success) {
                toast.success("Login successfully")
                localStorage.setItem("authUser", JSON.stringify(res.data))
                setAuthUser(res.data)
            } else {
                toast.error(res.data.message || "Login Failed, try again");
            }
        } catch (error) {
            console.log("Error in login hook", error.message)

            if (error.response) {
                toast.error(error.response.data.message || "something went wrong try agian")
            } else if (error.request) {
                toast.error("No response from server. Please check your internet connection.");
            } else {
                toast.error(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return {loading , Login}
}

export default useLogin


const handleError = (username , password) => {

    if (!username || !password) {
        toast.error("❌ username and password are required to proceed thank you 🌹");

        return false
    }

    return true
}