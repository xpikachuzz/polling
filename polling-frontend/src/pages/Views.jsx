import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Create } from './Create';
import { Poll } from './Poll';
import Login from './Login';
import Signup from './Signup';
import PrivateRoutes from './PrivateRoutes';
import { AccountContext } from '../context/AccountContext';

export const Views = () => {
    const {user} = useContext(AccountContext)

    return (
    <div>
      {
        user.loggedIn === null ? <h1 className="text-5xl w-screen text-center">LOADING</h1> :
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/poll/:id" element={<Poll />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<Create />} />
              </Route>
              <Route path="*" element={<Signup />} />
            </Routes>
          </>
      }
    </div>
  )
}