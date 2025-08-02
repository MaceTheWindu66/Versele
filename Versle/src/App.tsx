import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from './pages/Home';

import Navbar from './components/Navbar'
import './App.css'

function App() {
  

  return (


    
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
);
}

export default App
