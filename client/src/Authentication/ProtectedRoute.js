import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Auth';
import axios from 'axios';


function ProtectedRoute() {
    const { currentUser, login } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            if (!currentUser) {
                try {
                    const response = await axios.get('http://52.91.94.163:8080/checkAuth', { withCredentials: true });
                    if (response.data.isAuthenticated) {
                        login(response.data.user);
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error verifying user", error);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        verifyUser();
    }, [currentUser, login]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;