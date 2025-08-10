// src/context/AuthContext.jsx - Updated for Facility Registration
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Verify token by getting user profile
          const response = await axios.get(`${URL}/api/users/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.data.success) {
            setUser(response.data.data);
            setIsAuthenticated(true);
          } else {
            // Token is invalid
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Token is invalid or expired
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email);
      
      const response = await axios.post(`${URL}/api/auth/login`, {
        email,
        password
      });

      console.log('📝 Login response:', response.data);

      if (response.data.success) {
        const { user: userData, token, refreshToken } = response.data.data;
        
        // Store tokens
        localStorage.setItem('access_token', token);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        console.log('✅ Login successful');
        return { success: true, data: userData };
      } else {
        console.log('❌ Login failed:', response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      if (error.response) {
        return { 
          success: false, 
          message: error.response.data.message || 'Login failed' 
        };
      } else if (error.request) {
        return { 
          success: false, 
          message: 'Network error. Please check your connection.' 
        };
      } else {
        return { 
          success: false, 
          message: 'An unexpected error occurred' 
        };
      }
    }
  };

  // Register function (for facility owners)
  const register = async (formData) => {
    try {
      console.log('📝 Attempting registration for facility owner:', formData.email);
      
      const response = await axios.post(`${URL}/api/auth/register/facility`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        facilityName: formData.facilityName,
        facilityAddress: formData.facilityAddress,
        facilityDescription: formData.facilityDescription,
        pricePerHour: parseFloat(formData.pricePerHour),
        capacity: parseInt(formData.capacity),
        amenities: formData.amenities
      });

      console.log('📝 Registration response:', response.data);

      if (response.data.success) {
        const { user: userData, facility, token, refreshToken } = response.data.data;
        
        // Store tokens
        localStorage.setItem('access_token', token);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        
        // Update state - combine user and facility data
        const combinedUserData = {
          ...userData,
          facility: facility
        };
        
        setUser(combinedUserData);
        setIsAuthenticated(true);
        
        console.log('✅ Registration successful');
        return { success: true, data: combinedUserData };
      } else {
        console.log('❌ Registration failed:', response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      if (error.response) {
        return { 
          success: false, 
          message: error.response.data.message || 'Registration failed' 
        };
      } else if (error.request) {
        return { 
          success: false, 
          message: 'Network error. Please check your connection.' 
        };
      } else {
        return { 
          success: false, 
          message: 'An unexpected error occurred' 
        };
      }
    }
  };

  // Regular user registration (if needed)
  const registerUser = async (formData) => {
    try {
      console.log('📝 Attempting user registration:', formData.email);
      
      const response = await axios.post(`${URL}/api/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender
      });

      console.log('📝 User registration response:', response.data);

      if (response.data.success) {
        const { user: userData, token, refreshToken } = response.data.data;
        
        // Store tokens
        localStorage.setItem('access_token', token);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }
        
        // Update state
        setUser(userData);
        setIsAuthenticated(true);
        
        console.log('✅ User registration successful');
        return { success: true, data: userData };
      } else {
        console.log('❌ User registration failed:', response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('❌ User registration error:', error);
      
      if (error.response) {
        return { 
          success: false, 
          message: error.response.data.message || 'Registration failed' 
        };
      } else if (error.request) {
        return { 
          success: false, 
          message: 'Network error. Please check your connection.' 
        };
      } else {
        return { 
          success: false, 
          message: 'An unexpected error occurred' 
        };
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint
      await axios.post(`${URL}/api/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear local storage and state
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      if (!refresh_token) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${URL}/api/auth/refresh`, {
        refreshToken: refresh_token
      });

      if (response.data.success) {
        const { token, refreshToken: newRefreshToken } = response.data.data;
        
        localStorage.setItem('access_token', token);
        if (newRefreshToken) {
          localStorage.setItem('refresh_token', newRefreshToken);
        }
        
        return token;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout user
      logout();
      throw error;
    }
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Check if user has facility
  const hasFacility = () => {
    return user && user.facility;
  };

  // Check if user is facility owner
  const isFacilityOwner = () => {
    return hasFacility();
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register, // For facility owners
    registerUser, // For regular users
    logout,
    refreshToken,
    updateUser,
    setUser,
    hasFacility,
    isFacilityOwner
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};