import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './views/MainPage';
import AddClient from './views/AddClient';
import ScheduleView from './views/ScheduleView';
import DayDetailview from './views/DayDetailView';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddClient" element={<AddClient />} />
      <Route path="/ScheduleView" element={<ScheduleView />} />
      <Route path="/DayDetailview/:date" element={<DayDetailview />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
