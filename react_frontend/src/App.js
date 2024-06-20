import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import React from 'react';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Login />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
