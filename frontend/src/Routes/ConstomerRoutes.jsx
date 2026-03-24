import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import HomePage from "../pages/Home";
import Profile from "../components/Profile/Profile"; 
export const ConstomerRoutes = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar/>

            {/* Main Content Area */}
            <div> 
                <Routes>
                    
                    <Route path='/login' element={<HomePage />} />
                    <Route path='/register' element={<HomePage />} />
                    
                    <Route path='/' element={<HomePage />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>

            {/* Footer */}
            <div>
                <Footer/>
            </div>
            
        </div>
    )
}

export default ConstomerRoutes;