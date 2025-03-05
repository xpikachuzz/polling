import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Create } from './Create';
import { Poll } from './Poll';

export const Views = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/poll/:id" element={<Poll />} />
      </Routes>
    </div>
  )
}