import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './views/MainPage';
import AddClient from './views/AddClient';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddClient" element={<AddClient />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
