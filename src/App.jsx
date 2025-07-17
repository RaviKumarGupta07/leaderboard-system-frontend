
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        
        <Outlet />
      </div>
    </div>
  )
}

export default App
