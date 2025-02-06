import React, { useState } from 'react'
import Gender from '../SignUp/Gender'
import {Link} from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'


const SignUp = () => {

    const [input , setinput] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const {SignUp , loading} = useSignUp()

    const handleGenderCheckBox = (gender) => {
        setinput({...input,gender})
    }

    const SubmitHandle = async(e) => {
        e.preventDefault()
        await SignUp(input)
    }
  return (
    <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
    <div className='w-full p-6 rounded-md shadow-lg bg-clip-padding backdrop-blur-sm bg-opacity-0 text-center'>
        <h1 className='text-3xl font-semibold text-center italic'>SignUp

            <span className=' text-indigo-900 text-2xl italic mb-3 font-semibold'>To ChatApp</span>

        </h1>

        <form onSubmit={SubmitHandle}>

            <div className='mt-2'>
                <label className='flex justify-start p-2 text-gray-600'>
                    <span className='text-base label-text'>Fullname</span>
                </label>
                <input 
                type="text"
                placeholder='Example => DanishKhan' 
                className='w-full input bordered h-10 bg-black text-white' 
                value={input.fullname}
                onChange={(e)=> setinput({...input,fullname:e.target.value})}
                />
            </div>

            <div>
                <label className='flex justify-start p-2 text-gray-600'>
                    <span className='text-base label-text'>username</span>
                </label>
                <input type="text"
                placeholder='Example => danish99' 
                className='w-full input bordered h-10 bg-black text-white' 
                value={input.username}
                onChange={(e)=> setinput({...input,username:e.target.value})}
                />
                
            </div>


            <div>
                <label className='flex justify-start p-2 text-gray-600'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type="text" 
                placeholder='Example => 123 or abc or !@#' 
                className='w-full input bordered h-10 bg-black text-white' 
                value={input.password}
                onChange={(e)=>setinput({...input,password:e.target.value})}
                />
            </div>

            <div>
                <label className='flex justify-start p-2 text-gray-600'>
                    <span className='text-base label-text'>Confirm Password</span>
                </label>
                <input type="text" 
                placeholder='ConfirmPassword' 
                className='w-full input bordered h-10 bg-black text-white' 
                value={input.confirmPassword}
                onChange={(e)=>setinput({...input,confirmPassword:e.target.value})}
                />
            </div>

            {/*Gender section here */}
            <Gender OnCheckBoxChange={handleGenderCheckBox} slectGender={input.gender}/>

            <Link to={'/login'} className='text-sm hover:underline hover:text-blue-500 mt-1 inline-block'>Already have an account</Link>

            <div>
                <button className='btn btn-block mt-2 btn-sm' disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : "signup"}
                </button>
            </div>

        </form>
    </div>


</div>
  )
}

export default SignUp