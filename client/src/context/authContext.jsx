import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance.jsx';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    const getUser = async () => {
          if (hasFetchedProjects) return;
        try {
            const response = await axiosInstance.get('/user/me', {
                withCredentials: true
            });
            setUser(response.data);
            
        } catch (error) {
            console.error('Error getting the user :', error);
        }
    }
    const logOut = async () => {
    try {
        const response = await axiosInstance.get('/user/logout', {
            withCredentials: true
        });
        setUser(null);
    
    } catch (error) {
        const errorMessage = error?.response?.data?.error || 'an problem occurred while logging out';
        throw new Error(errorMessage);
    }
}


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/user/me', {
                    withCredentials: true
                });
                
                setUser(response.data);
            } catch (error) {
                // Si expiró, intenta refrescar y volver a obtener al usuario
                if (error.response?.status === 401) {
                    try {
                        await axiosInstance.get('/user/refreshToken', {
                            withCredentials: true
                        });

                        const userResponse = await axiosInstance.get('/user/me', {
                            withCredentials: true
                        });

                        setUser(userResponse.data);
                    } catch (refreshError) {
                        console.error('Error refreshing the token:', refreshError);
                    }
                } else {
                    console.error('error getting the user data:', error);
                }
            } finally {
                setLoading(false); // Set loading to false after the check
            }
        };

        checkAuth();
    }, []);



    return (
        <AuthContext.Provider value={{ user, getUser, logOut, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useStateContext = () => React.useContext(AuthContext);

export { AuthProvider, useStateContext };