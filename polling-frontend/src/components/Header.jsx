import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='bg-slate-500 flex flex-row justify-between items-center py-10 px-10'>
      <div className='flex flex-row gap-5'>
        <h1 className='text-md'>Logo</h1>
        <h1 className='text-4xl font-mono font-bold text-slate-950'>
          PollingPro
        </h1>
      </div>
      <div className=' flex flex-row-reverse gap-10'>
        <Link to={"/create"}>
          <button className='text-xl font-semibold rounded-md bg-slate-400 hover:bg-slate-500 hover:cursor-pointer hover:drop-shadow-md border-[1px] px-3 py-1 hover:scale-105 transition-transform'>
            Create Icon
          </button>
        </Link>
        <Link to={"/history"}>
          <button className='text-xl font-semibold rounded-md bg-slate-400 hover:bg-slate-500 hover:cursor-pointer hover:drop-shadow-md border-[1px] px-3 py-1 hover:scale-105 transition-transform'>
            History Icon
          </button>
        </Link>
        </div>
    </div>
  )
}
