import React, { useState } from 'react';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import Index from './components/pages/Index';
import axios from './config/axios';
import ContextCar from './components/context/ContextCar';
import ContextNoti from './components/context/ContextNoti';

export const Context = React.createContext();

function App() {
  const contextCarObj = ContextCar()
  const contextNotiObj = ContextNoti()

  return (
    <div className="App">
      <Context.Provider value={[contextCarObj, contextNotiObj]}>
      <Routes>
        <Route exact path="/" element={<Index/>}/> 
        
      </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
