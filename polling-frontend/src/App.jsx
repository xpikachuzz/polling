import './App.css'
import { Header } from './components/header'
import { UserContext } from './context/AccountContext'
import { useSocketSetup } from './hooks/useSocketSetup'
import { Views } from './pages/Views'





function App() {
  useSocketSetup()

  return (
      <UserContext>
        <div className="bg-slate-700 h-dvh max-w-7xl mx-auto">
          <Header />
          <Views />
        </div>
      </UserContext>
  )
}

export default App
