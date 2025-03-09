import React from 'react'

export const Home = () => {
  console.log("HOME")
  return (
    <div className='home bg-blue-900 h-full'>
      <div className='hero flex'>
        <div className='bg-blue-100 w-1/2 px-20 '>
          <h1 className='text-6xl font-semibold font-mono pt-60'>
            Welcome to your VOTING BOOTH
          </h1>
          <button className='my-10 bg-blue-300 px-4 py-2 rounded-md border-[1px] hover:bg-blue-200 hover:cursor-pointer hover:drop-shadow-xl hover:scale-105 transition-transform'>
            Create a poll!
          </button>
        </div>
        <div className='bg-blue-600 w-1/2 px-20 '>
          {/* <img className='text-6xl font-semibold font-mono px-20 py-60'/> */}
          <h1 className='text-6xl font-semibold font-mono py-60 '>
            IMAGE LOGO
          </h1>
        </div>
      </div>
    </div>
  )
}
