import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../State/Action/Action';
import {
    Box,
    Typography,
    Avatar,
    Button,
    Divider
} from '@mui/material';
import { Mail, LocationOn, Phone, Edit, Visibility, Description } from '@mui/icons-material';

const Profile = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const user = auth?.user;
    const isLoading = auth?.isLoading;

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt && !user) {
            dispatch(getUser());
        }
    }, [dispatch, user]);
    

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 text-blue-600 font-bold">
                Loading Profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-10 flex flex-col items-center">
            {/* Main Wrapper to keep sections aligned */}
            <div className="w-full max-w-5xl space-y-6 mt-20">
                
                {/* --- Top Action Buttons --- */}
                <div className="flex justify-end gap-3">
                    <Button
                        variant="contained"
                        startIcon={<Description />}
                        className="bg-blue-600 normal-case rounded-lg px-6 py-2 shadow-none"
                    >
                        Build Resume
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Visibility />}
                        className="border-gray-300 text-blue-600 normal-case rounded-lg px-6 py-2 bg-white"
                    >
                        Preview
                    </Button>
                </div>

                {/* --- Header Profile Card --- */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">
                    {/* Light Blue Banner Section */}
                    <div className="h-32 bg-blue-50 w-full relative"></div>

                    {/* Content Section */}
                    <div className="px-6 md:px-10 pb-8 relative">
                        {/* Avatar Positioning */}
                        <div className="absolute -top-16 left-6 md:left-10">
                            <Avatar
                                src={user?.profileImage}
                                sx={{
                                    width: { xs: 100, md: 130 },
                                    height: { xs: 100, md: 130 },
                                    border: '6px solid white',
                                    bgcolor: '#3b82f6',
                                    fontSize: '3rem',
                                    boxShadow: '0px 4px 10px rgba(0,0,0,0.05)'
                                }}
                            >
                                {user?.fullName?.charAt(0) || "TC"}
                            </Avatar>
                        </div>

                        {/* User Details & Edit Button Row */}
                        <div className="mt-20 flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="space-y-1">
                                <Typography variant="h4" className="font-bold text-gray-900 tracking-tight">
                                    {user?.fullName || "Tulsi Choudhary"}
                                </Typography>

                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-500 mt-2">
                                    <div className="flex items-center gap-1.5">
                                        <LocationOn className="text-gray-400 size-5" />
                                        <span className="text-sm md:text-base">{user?.location || "Bhopal, MP, India"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Phone className="text-gray-400 size-5" />
                                        <span className="text-sm md:text-base">{user?.phone || "+91 7049298434"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="text-gray-400 size-5" />
                                        <span className="text-sm md:text-base">{user?.email || "choudharytulsi421@gmail.com"}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 normal-case rounded-lg px-6 font-semibold shadow-none"
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- Profile Summary Card --- */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <Box>
                            <Typography variant="h5" className="font-bold text-gray-900 text-xl md:text-2xl">
                                Profile Summary
                            </Typography>
                            <Typography className="text-gray-500 text-sm mt-1">
                                A brief overview of your professional background
                            </Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            startIcon={<Edit />}
                            className="border-gray-200 text-gray-700 hover:bg-gray-50 normal-case rounded-xl px-6 py-2 font-semibold w-full md:w-auto"
                        >
                            Edit
                        </Button>
                    </div>

                    {/* Bio Content */}
                    <div className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-6 md:p-8">
                        <Typography className="text-gray-700 text-base md:text-lg leading-relaxed">
                            {user?.bio || "I want to become a full stack skilled Java developer."}
                        </Typography>
                    </div>
                </div>

                

            </div>
        </div>
    );
};

export default Profile;