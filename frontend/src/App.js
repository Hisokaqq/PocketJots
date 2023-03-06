import {  Routes, Route } from 'react-router-dom';
import './App.css';
import Cursor from './components/Cursor';
import HomeScreen from './screen/HomeScreen';

function App() {
  return (
      <div className="App">
        <Cursor/>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {/* Add more routes here */}
        </Routes>
      </div>
  );
}


export default App;
