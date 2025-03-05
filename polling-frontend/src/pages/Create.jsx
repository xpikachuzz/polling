import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Create = () => {
  const [choices, setChoices] = useState(['1st choice', '2nd choice'])
  // format [title error, ...choices errors]
  const [errors, setErrors] = useState(['', '', ''])
  const titleRef = useRef()
  const durationRef = useRef()
  const [durationError, setDurationError] = useState("")

  const navigate = useNavigate()


  async function submitPoll() {
    let ers = [...errors]

    if (!titleRef.current.value) {
      ers[0] = "Poll's prompt can't be empty"
    } else {
      ers[0] = ""
    }

    ers = ers.map((er, idx) => {
      if (!idx) return er
      if (!choices[idx-1]) {
        return "The choice can't be empty"
      } else {
        return ""
      }
    })

    let durErr = ""
    if (!durationRef.current.value) {
      setDurationError("Durations is empty")
      durErr = "Durations is empty"
    } else {
      setDurationError("")
    }

    const isError = ers.reduce((acc, val) => !!val || acc, false) || durErr

    // Are choices not empty
    if (isError) {
      setErrors(ers)
    } else {
      // POST poll
      const res = await fetch("http://localhost:3000/poll/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title: titleRef.current.value, choices, duration: Number(durationRef.current.value)})
      })
      const data = await res.json()
      if (data.ok) {
        navigate(`/poll/${data.id}`)
      }
    }
  }

  function addChoiceHandler() {
    setChoices(chses => [...chses, "NEW CHOICE"])
    setErrors(ers => [...ers, ""])
  }

  function deleteChoiceHandler(i) {
    setChoices(chses => chses.filter((_, idx) => idx !== i))
    setErrors(ers => ers.filter((_, idx) => idx !== i+1))
  }

  function choiceHandler(e, i) {
    setChoices(choices.map((chs, idx) => idx === i ? e.target.value : chs))
  }

  return (
    <div className='home bg-blue-900 h-full py-20 px-20'>
      <h1 className='text-3xl font-bold font-mono text-slate-300'>Create a Poll</h1>
      <input 
        ref={titleRef}
        className='bg-slate-100 mt-4 w-full px-2 py-1 text-2xl font-sans border-[1px] rounded-lg' 
      />
      <p className='text-red-500 text-sm ml-1 mt-1'>{errors[0]}</p>
      {
        choices.map((choice, i) => (
          <div key={i}>
            <div className='flex gap-1 items-end text-3xl mt-4 '>
              <label className='text-slate-200'>{i+1}.</label>
              <input 
                onChange={(e) => choiceHandler(e, i)} 
                value={choice} 
                className='bg-slate-100 w-full px-2 py-1 text-2xl font-sans border-[1px] rounded-lg' 
              />
              <button 
                onClick={() => deleteChoiceHandler(i)} 
                className='bg-slate-100 text-gray-600 mt-4 font-semibold w-fit px-3 py-1 text-2xl font-sans border-[2px] rounded-lg hover:bg-slate-200 hover:shadow-2xl transition-shadow  duration-300' 
              >
                🗑️
              </button>
            </div>
            <p className='text-red-500 text-sm ml-1 mt-1'>{errors[i+1]}</p>
          </div>
        ))
      }
      <button 
        onClick={addChoiceHandler} 
        className='bg-slate-100 text-gray-600 mt-4 font-bold w-full px-2 py-1 text-2xl font-sans border-[2px] rounded-lg hover:bg-slate-200 hover:shadow-2xl transition-shadow duration-300' 
      >
        + Add Choice
      </button>
      <div className='flex items-center text-3xl text-slate-300 font-semibold gap-2 mt-4'>
        <label>Duration (min) : </label>
        <input type="number" pattern="\d+" ref={durationRef} className='bg-slate-100 text-slate-600 font-normal px-2 py-1 text-2xl font-sans border-[1px] rounded-lg' />
        <div className='text-red-500 text-sm ml-1 mt-1'>
         {durationError}
        </div>
      </div>
      <button onClick={submitPoll} className='text-lg font-mono font-semibold my-8 bg-blue-300 px-4 py-2 rounded-md border-[1px] hover:bg-blue-200 hover:cursor-pointer hover:drop-shadow-xl hover:scale-105 transition-transform'>
        Submit Poll!
      </button>
      
    </div>
  )
}
