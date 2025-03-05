import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import socket from '../socket';

export const Poll = () => {
  const {id} = useParams()
  const [pollData, setPollData] = useState({error: null, loading: true, data: "null"})

  useEffect(() => {
    setPollData({error: null, loading: true, data: "null"})
    // fetch poll data
    fetch("http://localhost:3000/poll/"+id)
      .then(
        res => res.json()
      )
      .then(
        data => {
          setPollData(dataObj => ({data, loading: false, error: null}))
          socket.emit("poll_room_join", id)
        }
      )
      .catch(
        error => setPollData(dataObj => ({data: null, loading: false, error}))
      )

    return () => {
      socket.emit("poll_room_leave", id)
    }
  }, [setPollData, id])




  function castVote(i) {
    // 

    // 
    

  }

  if (pollData.loading) {
    return (
      <div className='bg-blue-900 h-full text-6xl text-slate-200 text-center'>
        ↺ Loading... ↺
      </div>
    )
  }

  if (pollData.error) {
    return (
      <div className='bg-blue-900 h-full text-6xl text-slate-200 text-center'>
        {pollData.error}
      </div>
    )
  }

  if (!pollData.data) {
    return <h1>Not Found</h1>
  }

  const sumTotal = pollData.data.choices.reduce((acc,val) => acc+val.count ,0)

  return (
    <div className='bg-blue-900 h-full text-slate-200'>
      <div className='bg-blue-900 h-full text-slate-200 text-center py-10 px-20'>
        <h1 className='text-6xl'>
          {pollData.data.title}
        </h1>
        <div className='flex flex-col gap-5 mt-10 px-10'>
          {
            pollData.data.choices.map(({id, prompt, count}) => (
              <button key={id} onClick={() => castVote(id)} className='relative text-green-950 flex justify-between overflow-clip font-bold text-xl bg-blue-300 px-4 py-2 rounded-md border-[1px] hover:bg-blue-400 hover:border-slate-400 hover:cursor-pointer hover:drop-shadow-xl hover:scale-[101%] transition-transform'>
                <div className={"z-0 bg-blue-400/80 rounded-md absolute left-0 top-0 bottom-0 w-["+ String(count/sumTotal * 100) + "%]"}></div>
                <h1 className='z-10'>{prompt}</h1>
                <h1 className='z-10'>Votes: {count}</h1>
              </button>
            ))
          }
        </div>
        <h3 className='mt-4 font-bold text-2xl'>{sumTotal} votes have been casted!</h3>
      </div>
    </div>
  )
}
