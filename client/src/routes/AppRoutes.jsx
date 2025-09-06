import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import About from '../pages/About';
import Cars from '../pages/Cars';
import Contact from '../pages/Contact';
import AddCar from '../components/AddCar';
import UpdateCar from '../pages/UpdateCar';
import BookCar from '../pages/BookCar';
import BookingHistory from '../pages/BookingHistory';
import AdminHomeImageUpload from '../pages/AdminHomeImageUpload';
import AdminRoute from '../components/AdminRoute';
import FAQ from '../pages/FAQ';
import AdminSignup from '../pages/AdminSignup';
import AdminLogin from '../pages/AdminLogin';
import AdminBookings from '../pages/AdminBookings';

const AppRoutes = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/faq' element={<FAQ/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/admin/signup" element={<AdminSignup/>} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path='/update-car/:id' element={<UpdateCar/>}/>
        <Route path="/book/:id" element={<BookCar/>} />
        <Route path="/bookings" element={<BookingHistory/>}/>
        <Route path="/admin/upload-home-images" element={<AdminRoute><AdminHomeImageUpload/> </AdminRoute>}/>
        <Route path='/admin/bookings' element={<AdminBookings/>} />
      </Routes>
      <Footer/>
      </div>
  );
};

export default AppRoutes;
