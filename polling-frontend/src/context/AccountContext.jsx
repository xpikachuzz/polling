import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export const AccountContext = createContext()


export const UserContext = ({children}) => {
  const [user, setUser] = useState({loggedIn: null});
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000"+"/auth/login", {
      credentials: 'include'
    })
      .catch(err => {
        setUser({loggedIn: false})
      })
      .then(r => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({loggedIn: false})
          return
        }
        return r.json()
      })
      .then(data => {
        if (!data) {
          setUser({loggedIn: false})
          return
        }
        if (data) {
          setUser({...data})
        }
      })
  }, [])
  return <AccountContext.Provider value={{user, setUser}}>
    {children}
  </AccountContext.Provider>
}