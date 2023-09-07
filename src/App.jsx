import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import TaskPage from './Pages/TaskPage';
import Footer from './Components/Footer';
import Contact from './Pages/Contact';
import AdminPage from './Pages/AdminPage';
import NotFound from './Pages/NotFound';
import AboutUs from './Pages/AboutUs';
import './index.css';


function App() {
  return (
    <div className="app">
      <Navbar />     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/TaskPage" element={<TaskPage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/error404" element={<NotFound />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;