import './App.css'
import { Header } from './components/header'
import { useSocketSetup } from './hooks/useSocketSetup'
import { Views } from './pages/Views'





function App() {
  useSocketSetup()

  return (
      <div className="bg-slate-700 h-dvh max-w-7xl mx-auto">
        <Header />
        <Views />
      </div>
  )
}

export default App
