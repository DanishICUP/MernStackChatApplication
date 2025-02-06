import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate()

    const { setAuthUser } = useAuthContext()

    const SignUp = async ({ fullname, username, password, confirmPassword, gender }) => {

        const success = handleError({ fullname, username, password, confirmPassword, gender })
        if (!success) return;

        setLoading(true)
        try {
            const response = await axios.post('/api/auth/signup', {
                fullname, username, password, confirmPassword, gender
            })
            console.log(response.data)
            if (response.data.success) {
                toast.success("Register successfully")
                // navigate('/login')
                //localstorage 
                localStorage.setItem("authUser", JSON.stringify(response.data))
                //context
                setAuthUser(response.data)
            } else {
                toast.error(response.data.message)
            }



        } catch (error) {
            console.log("error in resgister user ", error)

            if (error.response) {

                toast.error(error.response.data.message || "Something went wrong!");
            } else if (error.request) {

                toast.error("No response from server. Check your network.");
            } else {

                toast.error(error.message);
            }

        } finally {
            setLoading(false)
        }
    }

    return { SignUp, loading }
}

export default useSignUp


function handleError({ fullname, username, password, confirmPassword, gender }) {

    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("❌ All fields are required! Please fill out every field to proceed. ✅")

        return false;
    }

    if (password !== confirmPassword) {
        toast.error("❗ password mismatch ! Please Enter Correct password to proceed.")

        return false;
    }

    if (password.length < 6) {
        toast.error("❌ password must be atleast 6 characters")

        return false;
    }

    if (username !== username.toLowerCase()) {
        toast.error("❗ Please enter the username in lowercase (e.g, danish99)");

        return false;
    }

    return true;
}   