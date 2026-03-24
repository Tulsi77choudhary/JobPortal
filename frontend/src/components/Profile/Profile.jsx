import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../State/Action/Action';
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Button,
    Divider
} from '@mui/material';
import { Mail, LocationOn, Phone } from '@mui/icons-material';

const Profile = () => {
    

    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const user = auth?.user;
    const isLoading = auth?.isLoading;

    
    useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !user) {
        dispatch(getUser());
    } else if (!jwt) {
        // Agar JWT nahi hai, toh user ko login page par redirect kar dena chahiye
        // ya loading false kar deni chahiye.
    }
}, [dispatch, user]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-950 text-blue-500 font-bold">
                Loading Profile...
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-950 pt-0">
            {/* Top Banner */}
            <div className="w-full h-32 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 relative">
                <div className="absolute -bottom-16 left-8 md:left-16">
                    <Avatar
                        src={user?.profileImage}
                        sx={{
                            width: { xs: 100, md: 140 },
                            height: { xs: 100, md: 140 },
                            border: '6px solid #030712',
                            bgcolor: '#3b82f6',
                            fontSize: '3rem'
                        }}
                    >
                        {user?.fullName?.charAt(0) || user?.email?.charAt(0)}
                    </Avatar>
                </div>
            </div>

            <div className="px-8 md:px-16 mt-20 pb-12">
                {/* Main Header Section */}
                <Box className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <Box className="space-y-1">
                        <Typography variant="h3" className="font-bold text-white tracking-tight">
                            {user?.fullName || user?.name || "User Name"}
                        </Typography>
                        <Typography variant="h6" className="text-blue-400 font-medium pb-2">
                            {user?.role || "Job Seeker"}
                        </Typography>
                        
                        {/* Information Row - Clean & Scalable */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400">
                            <div className="flex items-center gap-2">
                                <LocationOn className="text-blue-400 size-5" />
                                <span className="text-base md:text-lg">{user?.location || "Location Not Set"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="text-blue-400 size-5" />
                                <span className="text-base md:text-lg">{user?.phone || "No Phone"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="text-blue-400 size-5" />
                                <span className="text-base md:text-lg">{user?.email || "No Email"}</span>
                            </div>
                        </div>
                    </Box>

                    <Button
                       // onClick={() => setIsEditModalOpen(true)}
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2.5 normal-case font-bold shadow-lg shadow-blue-900/20"
                    >
                        Edit Profile
                    </Button>
                </Box>

                <Divider className="bg-white/10 my-10" />

                <Grid container spacing={6}>
                    <Grid item xs={12} lg={8}>
                        <Box className="space-y-10">
                            <Box>
                                <Typography variant="h5" className="mb-4 font-bold text-white uppercase text-sm tracking-widest opacity-70">About Me</Typography>
                                <Typography className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                                    {user?.bio || "No bio available. Click 'Edit Profile' to add one!"}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="h5" className="mb-6 font-bold text-white uppercase text-sm tracking-widest opacity-70">Top Skills</Typography>
                                <div className="flex flex-wrap gap-3">
                                    {user?.skills?.length > 0 ? (
                                        user.skills.map((skill, index) => (
                                            <span key={index} className="px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 font-medium">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 italic">No skills listed yet</span>
                                    )}
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>

            
        
        </div>
    );
};

export default Profile;