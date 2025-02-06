import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {

    const [username, setUserName] = useState("");
    const [password, setpassword] = useState("");

    const { loading, Login } = useLogin()

    const HandleSubmitLogin = async (e) => {
        e.preventDefault()
        await Login(username, password)
    }

    return (
        <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
            <div className='w-full p-6 rounded-md shadow-lg bg-clip-padding backdrop-blur-md bg-opacity-0 text-center'>

                <h1 className='text-3xl font-semibold text-center italic'>Login</h1>
                <span className=' text-indigo-900 text-2xl italic mb-3 font-semibold'>To ChatApp</span>

                <form onSubmit={HandleSubmitLogin}>

                    <div className='mt-2 '>
                        <label className='flex justify-start p-2 text-gray-600'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type="text"
                            placeholder='Enter Username'
                            className='w-full input bordered bg-black text-white h-10'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='flex justify-start p-2 text-gray-600'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="text"
                            placeholder='Enter Password'
                            className='w-full input bordered bg-black text-white h-10'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>

                    <Link to={'/signup'} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block cursor-pointer'>Dont't have and account</Link>

                    <div>
                        <button className='btn btn-block mt-2 btn-sm p-3' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login