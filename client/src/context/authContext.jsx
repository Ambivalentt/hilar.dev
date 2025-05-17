import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance.jsx';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await axiosInstance.get('/user/me', {
                withCredentials: true
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
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
                        console.error('Error al refrescar token:', refreshError);
                    }
                } else {
                    console.error('Error al obtener el usuario:', error);
                }
            }
        };

        checkAuth();
    }, []);



    return (
        <AuthContext.Provider value={{ user, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

const useStateContext = () => React.useContext(AuthContext);

export { AuthProvider, useStateContext };