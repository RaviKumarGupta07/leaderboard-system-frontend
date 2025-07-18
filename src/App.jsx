import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <Outlet />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
