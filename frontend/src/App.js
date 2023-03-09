import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Cursor from './components/Cursor';
import LogReg from './screen/LogReg';
import HomeScreen from './screen/HomeScreen';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';

function App() {
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    const profileData = localStorage.getItem('profile');
    if (!profileData) {
      navigate('/login');
    } else {
      const profileObject = JSON.parse(profileData);
      const profileId = profileObject.id;
      axios.get(`http://127.0.0.1:8000/api/profiles/${profileId}/`)
        .then(response => {
          localStorage.setItem('profile', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [navigate]);

  return (
    <div className="App">
      <Cursor />
      <AnimatePresence mode={'wait'}>
        <Routes location={ location} key={location.pathname}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LogReg />} />
          <Route path="/e" element={<div />} />

          {/* Add more routes here */}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
