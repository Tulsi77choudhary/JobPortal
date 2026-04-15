import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import HomePage from "../pages/Home";
import Profile from "../components/Profile/Profile"; 
import JobList from "../components/JobList"
import JobDetail from '../components/JobDetail/JobDetail';
import Resume from '../components/resume/resume';
import Application from '../components/Application/Application';

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
                    <Route path="/jobList" element={<JobList/>}/>
                    <Route path="/jobDetail" element={<JobDetail/>}/>
                    <Route path="/resume" element={<Resume/>}/>
                    <Route path="/application" element={<Application/>}/>
                    
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