import React from "react";
import {Routes, Route} from "react-router-dom";
import { AuthProvider } from "./Authentication/Auth";
import ProtectedRoute from './Authentication/ProtectedRoute';
import Home from './views/MainPage';
import AddClient from './views/AddClient';
import ScheduleView from './views/ScheduleView';
import DayDetailview from './views/DayDetailView';
import ClientList from './views/ClientList';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/Register';
import UsersList from './views/UsersList';
import Upcoming from './views/Upcoming';

const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/RegisterPage" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
      <Route path="/MainPage" element={<Home />} />
      <Route path="/AddClient" element={<AddClient />} />
      <Route path="/ScheduleView" element={<ScheduleView />} />
      <Route path="/DayDetailview/:date" element={<DayDetailview />} />
      <Route path="/ClientList" element={<ClientList />} />
      <Route path="/UsersList" element={<UsersList />} />
      <Route path="/Upcoming" element={<Upcoming />} />
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;
