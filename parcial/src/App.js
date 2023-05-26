import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Cafes from './components/cafes';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/cafes" element={<Cafes/>} />
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
