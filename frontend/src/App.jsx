import React from 'react'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'


const App = () => {

  const { authUser } = useAuthContext()
  // console.log(authUser)

  return (

    <>
      <div className='flex items-center justify-center h-screen p-4'>
        <Toaster />
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to='/signup' />} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
      </div>

    </>
  )
}

export default App