import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import Error404 from './pages/Error404';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
