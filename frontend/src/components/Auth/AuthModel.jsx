import React, { useState, useEffect } from "react";
import { Box, Modal, useTheme, useMediaQuery, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Register from "./Register";
import Login from "./Login";
import { useLocation } from "react-router-dom";

const AuthModel = ({ open, handleClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 1. Ek internal state banayein jo switch karega
  const [isLoginView, setIsLoginView] = useState(true);

  // 2. Agar URL ke through bhi handle karna hai toh useEffect use karein
  useEffect(() => {
    if (location.pathname === "/login") setIsLoginView(true);
    if (location.pathname === "/register") setIsLoginView(false);
  }, [location.pathname]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "92%" : 500,
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    outline: "none",
    p: isMobile ? 2 : 4,
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box sx={style}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2 className="text-center ml-4 font-bold text-xl">
            {isLoginView ? "Login" : "Register"}
          </h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Body */}
        <Box>
          {isLoginView ? (
            <Login />
          ) : (
            <Register />
          )}

          {/* Footer switch link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLoginView(!isLoginView)}
                className="ml-2 text-blue-600 font-bold hover:underline"
              >
                {isLoginView ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModel;