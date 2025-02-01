import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/auth/login");
        }
    }, [token, navigate]);

    if (!token) return null; // Prevent rendering when navigating

    return children; // Render protected content if token exists   
    //yha children ka mtlb gai jo hmne app.js me private route ke andr dashboard dia h 
};

export default PrivateRoute;

