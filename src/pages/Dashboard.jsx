// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ArrowUp,
  ArrowDown,
  RefreshCw,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalRevenue: { value: "0", change: "0%" },
    totalBookings: { value: "0", change: "0%" },
    monthlyRevenue: { value: "0", change: "0%" },
    averageRating: { value: "0", change: "0%" }
  });
  const [activeButton, setActiveButton] = useState('recent');

  // Fetch facility dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/facilities/profile/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const stats = response.data.data;
        console.log('Dashboard stats received:', stats); // Debug log
        
        // Safe number conversion with fallbacks
        const totalRevenue = parseFloat(stats.totalRevenue) || 0;
        const monthlyRevenue = parseFloat(stats.monthlyRevenue) || 0;
        const totalBookings = parseInt(stats.totalBookings) || 0;
        const monthlyBookings = parseInt(stats.monthlyBookings) || 0;
        const averageRating = parseFloat(stats.averageRating) || 0;
        
        setDashboardStats({
          totalRevenue: {
            value: totalRevenue > 0 ? `₦${totalRevenue.toLocaleString()}` : "₦0",
            change: "+12.5%" // You can calculate this based on previous period data
          },
          totalBookings: {
            value: totalBookings.toString(),
            change: monthlyBookings > 0 ? `+${monthlyBookings}` : "0"
          },
          monthlyRevenue: {
            value: monthlyRevenue > 0 ? `₦${monthlyRevenue.toLocaleString()}` : "₦0",
            change: "+8.3%"
          },
          averageRating: {
            value: averageRating > 0 ? averageRating.toFixed(1) : "0.0",
            change: "+0.2"
          }
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      
      // Set fallback data if API fails
      setDashboardStats({
        totalRevenue: { value: "₦0", change: "0%" },
        totalBookings: { value: "0", change: "0%" },
        monthlyRevenue: { value: "₦0", change: "0%" },
        averageRating: { value: "0.0", change: "0%" }
      });
      
      setError('Failed to load dashboard statistics');
    }
  };

  // Fetch facility bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${URL}/api/facilities/profile/bookings?limit=10&status=confirmed`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const allBookings = response.data.data;
        setBookings(allBookings);
        
        // Filter recent bookings (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recent = allBookings.filter(booking => 
          new Date(booking.createdAt) >= sevenDaysAgo
        );
        setRecentBookings(recent);

        // Filter today's bookings
        const today = new Date().toDateString();
        const todayBookings = allBookings.filter(booking => 
          new Date(booking.startTime).toDateString() === today
        );
        setTodaysBookings(todayBookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
    }
  };

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchBookings()
      ]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Get status color for booking status
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  // Format booking ID
  const formatBookingId = (id) => {
    return `#GDEY-${id.slice(-8).toUpperCase()}`;
  };

  // Get current bookings based on active filter
  const getCurrentBookings = () => {
    return activeButton === 'recent' ? recentBookings : todaysBookings;
  };

  // Render booking cards
  const renderBookingCards = () => {
    const currentBookings = getCurrentBookings().slice(0, 3);
    
    if (currentBookings.length === 0) {
      return (
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {activeButton === 'recent' ? 'No recent bookings' : 'No bookings for today'}
          </p>
        </div>
      );
    }

    return (
      <div className='flex gap-x-6 max-w-[1125px]'>
        {currentBookings.map((booking) => {
          const startTime = formatDateTime(booking.startTime);
          const endTime = formatDateTime(booking.endTime);
          
          return (
            <button 
              key={booking.id}
              className='border border-black border-r-[6px] border-b-[4px] rounded-xl px-3 py-4 mt-6'
              onClick={() => navigate(`/booking-details/${booking.id}`)}
            >
              <div className='flex gap-x-12 gap-y-4 justify-between'>
                <div className='text-left'>
                  <p className='font-medium'>{user.facility?.name || 'Your Facility'}</p>
                  <p className='font-normal text-gray-400'>Booking ID</p>
                  <p className='font-normal text-gray-400'>User</p>
                  <p className='font-normal text-gray-400'>Participants</p>
                  <p className='font-normal text-gray-400'>Selected Time</p>
                  <p className='font-normal text-gray-400'>Payment</p>
                </div>

                <div className='text-right'>
                  <button className={`rounded-2xl px-2 py-1 text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-[#C7FFC0] text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </button>
                  <p className='font-normal text-black'>{formatBookingId(booking.id)}</p>
                  <p className='font-normal text-black'>
                    {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                  </p>
                  <p className='font-normal text-black'>{booking.participantsCount || 1} people</p>
                  <p className='font-normal text-black'>
                    {startTime.time} | {startTime.date}
                  </p>
                  <p className='font-normal text-black'>₦{parseFloat(booking.totalAmount).toLocaleString()}</p>
                </div>
              </div>

              <button className='border-2 border-[#946BEF] rounded-2xl py-3 px-16 text-[#946BEF] font-medium mt-4'>
                View Details
              </button>
            </button>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
          <span className="text-sm text-red-700">{error}</span>
          <button 
            onClick={fetchDashboardData}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-r-[6px] border-b-[4px] border-black border">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-black">Total Revenue</h3>
          </div>
          <div className="flex items-end mt-2 justify-between">
            <span className="text-3xl font-bold">{dashboardStats.totalRevenue.value}</span>
            <span className={`text-sm flex items-center ${
              dashboardStats.totalRevenue.change.startsWith('+')
                ? 'text-green-500'
                : dashboardStats.totalRevenue.change.startsWith('-')
                  ? 'text-red-500'
                  : 'text-gray-500'
            }`}>
              {dashboardStats.totalRevenue.change.startsWith('+') ? (
                <ArrowUp size={14} className="mr-1" />
              ) : dashboardStats.totalRevenue.change.startsWith('-') ? (
                <ArrowDown size={14} className="mr-1" />
              ) : null}
              {dashboardStats.totalRevenue.change}
            </span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-r-[6px] border-b-[4px] border-black border">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-black">Total Bookings</h3>
          </div>
          <div className="flex items-end mt-2 justify-between">
            <span className="text-3xl font-bold">{dashboardStats.totalBookings.value}</span>
            <span className={`text-sm flex items-center ${
              dashboardStats.totalBookings.change.startsWith('+')
                ? 'text-green-500'
                : dashboardStats.totalBookings.change.startsWith('-')
                  ? 'text-red-500'
                  : 'text-gray-500'
            }`}>
              {dashboardStats.totalBookings.change.startsWith('+') ? (
                <ArrowUp size={14} className="mr-1" />
              ) : dashboardStats.totalBookings.change.startsWith('-') ? (
                <ArrowDown size={14} className="mr-1" />
              ) : null}
              {dashboardStats.totalBookings.change}
            </span>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-r-[6px] border-b-[4px] border-black border">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-black">Monthly Revenue</h3>
          </div>
          <div className="flex items-end mt-2 justify-between">
            <span className="text-2xl font-bold">{dashboardStats.monthlyRevenue.value}</span>
            <span className={`text-sm flex items-center ${
              dashboardStats.monthlyRevenue.change.startsWith('+')
                ? 'text-green-500'
                : dashboardStats.monthlyRevenue.change.startsWith('-')
                  ? 'text-red-500'
                  : 'text-gray-500'
            }`}>
              {dashboardStats.monthlyRevenue.change.startsWith('+') ? (
                <ArrowUp size={14} className="mr-1" />
              ) : dashboardStats.monthlyRevenue.change.startsWith('-') ? (
                <ArrowDown size={14} className="mr-1" />
              ) : null}
              {dashboardStats.monthlyRevenue.change}
            </span>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-r-[6px] border-b-[4px] border-black border">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-black">Average Rating</h3>
          </div>
          <div className="flex items-end mt-2 justify-between">
            <span className="text-2xl font-bold">{dashboardStats.averageRating.value}⭐</span>
            <span className={`text-sm flex items-center ${
              dashboardStats.averageRating.change.startsWith('+')
                ? 'text-green-500'
                : dashboardStats.averageRating.change.startsWith('-')
                  ? 'text-red-500'
                  : 'text-gray-500'
            }`}>
              {dashboardStats.averageRating.change.startsWith('+') ? (
                <ArrowUp size={14} className="mr-1" />
              ) : dashboardStats.averageRating.change.startsWith('-') ? (
                <ArrowDown size={14} className="mr-1" />
              ) : null}
              {dashboardStats.averageRating.change}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Filter Switch */}
      <div className='bg-gray-100 w-[300px] p-2 rounded-lg mb-4'>
        <div className='flex gap-x-2'>
          <button
            className={`px-2 py-1 rounded-lg transition-colors ${
              activeButton === 'recent'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveButton('recent')}
          >
            Recent Bookings ({recentBookings.length})
          </button>
          <button
            className={`px-2 py-1 rounded-lg transition-colors ${
              activeButton === 'today'
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveButton('today')}
          >
            Today's Bookings ({todaysBookings.length})
          </button>
        </div>
      </div>

      {/* Recent/Today's Booking Cards */}
      {renderBookingCards()}

      {/* Upcoming Bookings Table */}
      <div className="py-6 max-w-[1125px]">
        <div className='flex justify-between mb-2'>
          <p className="text-2xl font-semibold text-gray-800">All Bookings</p>
          <button 
            onClick={() => navigate('/bookings')}
            className='text-[#946BEF] font-bold hover:underline'
          >
            View all
          </button>
        </div>
        
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.length > 0 ? (
                bookings.map((booking) => {
                  const startTime = formatDateTime(booking.startTime);
                  const endTime = formatDateTime(booking.endTime);
                  
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatBookingId(booking.id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.participantsCount || 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {startTime.time}<br />
                        <span className="text-xs text-gray-500">{startTime.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {endTime.time}<br />
                        <span className="text-xs text-gray-500">{endTime.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₦{parseFloat(booking.totalAmount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
                          onClick={() => navigate(`/booking-details/${booking.id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;