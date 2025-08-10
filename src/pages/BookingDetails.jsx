// pages/BookingDetails.jsx - Integrated with Backend
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CircleChevronLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  RefreshCw
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import largeouterstadium from '../assets/largeouterstadium.png';
import field1 from '../assets/field1.png';
import field2 from '../assets/field2.png';

const BookingDetails = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  // Fetch booking details
  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view booking details');
        return;
      }

      const response = await axios.get(`${URL}/api/bookings/${bookingId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setBooking(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching booking details:', err);
      setError(err.response?.data?.message || 'Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (status, reason = '') => {
    try {
      setUpdating(true);
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to update booking status');
        return;
      }

      const response = await axios.patch(
        `${URL}/api/bookings/${bookingId}/status`,
        { status, cancellationReason: reason },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBooking(prev => ({
          ...prev,
          status,
          cancellationReason: reason
        }));
        
        alert(`Booking ${status} successfully`);
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert(err.response?.data?.message || 'Failed to update booking status');
    } finally {
      setUpdating(false);
    }
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    if (newStatus === 'cancelled') {
      const reason = prompt('Please provide a reason for cancellation:');
      if (reason !== null) {
        updateBookingStatus(newStatus, reason);
      }
    } else {
      const confirmMessage = `Are you sure you want to ${newStatus} this booking?`;
      if (window.confirm(confirmMessage)) {
        updateBookingStatus(newStatus);
      }
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
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

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle size={20} className="text-green-600" />,
          bgColor: 'bg-green-50'
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock size={20} className="text-yellow-600" />,
          bgColor: 'bg-yellow-50'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle size={20} className="text-red-600" />,
          bgColor: 'bg-red-50'
        };
      case 'completed':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <CheckCircle size={20} className="text-blue-600" />,
          bgColor: 'bg-blue-50'
        };
      case 'no_show':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle size={20} className="text-gray-600" />,
          bgColor: 'bg-gray-50'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle size={20} className="text-gray-600" />,
          bgColor: 'bg-gray-50'
        };
    }
  };

  // Calculate duration
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Booking not found</h3>
          <p className="text-gray-500">The booking you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(booking.status);
  const startTime = formatDateTime(booking.startTime);
  const endTime = formatDateTime(booking.endTime);
  const duration = calculateDuration(booking.startTime, booking.endTime);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className='flex gap-x-2 font-semibold text-xl hover:text-purple-600 transition-colors'
          >
            <CircleChevronLeft size={28} />
            <span>{booking.Facility?.name || 'Booking Details'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBookingDetails}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          
          {/* Status Badge */}
          <div className={`inline-flex items-center px-3 py-2 rounded-full border ${statusInfo.color}`}>
            {statusInfo.icon}
            <span className="ml-2 font-medium capitalize">{booking.status}</span>
          </div>
        </div>
      </div>

      {/* Facility Description */}
      {booking.Facility?.description && (
        <p className='text-gray-500 text-sm py-3 max-w-3xl'>
          {booking.Facility.description}
        </p>
      )}

      {/* Facility Images */}
      <div className="mb-8">
        <img src={largeouterstadium} className='w-full h-64 object-cover rounded-lg mb-4' alt="Facility main view" />
        
        <div className='flex gap-x-3'>
          <img src={field1} className='w-[300px] h-[150px] object-cover rounded-lg' alt="Facility view 1" />
          <img src={field2} className='w-[300px] h-[150px] object-cover rounded-lg' alt="Facility view 2" />
          <div className='bg-[#946BEF] rounded-md w-[200px] h-[150px] flex items-center justify-center'>
            <p className='text-white text-lg'>See All</p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className='font-semibold text-2xl mb-6'>Booking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className='text-gray-400 text-sm mb-1'>Booking ID</p>
                <p className='text-black font-medium'>{formatBookingId(booking.id)}</p>
              </div>

              <div>
                <p className='text-gray-400 text-sm mb-1'>Booking Type</p>
                <p className='text-black font-medium capitalize'>{booking.bookingType}</p>
              </div>

              <div>
                <p className='text-gray-400 text-sm mb-1'>Date</p>
                <p className='text-black font-medium'>{startTime.date}</p>
              </div>

              <div>
                <p className='text-gray-400 text-sm mb-1'>Time</p>
                <p className='text-black font-medium'>{startTime.time} - {endTime.time}</p>
              </div>

              <div>
                <p className='text-gray-400 text-sm mb-1'>Duration</p>
                <p className='text-black font-medium'>{duration}</p>
              </div>

              <div>
                <p className='text-gray-400 text-sm mb-1'>Participants</p>
                <p className='text-black font-medium'>{booking.participantsCount || 1} people</p>
              </div>

              <div>
                <p className='text-gray-400 text-sm mb-1'>Total Amount</p>
                <p className='text-black font-medium text-lg'>₦{parseFloat(booking.totalAmount).toLocaleString()}</p>
              </div>

              <div>
                <p className='text-gray-400 text-sm mb-1'>Payment Status</p>
                <p className={`font-medium ${
                  booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                </p>
              </div>
            </div>

            {/* Notes */}
            {booking.notes && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className='text-gray-400 text-sm mb-2'>Additional Notes</p>
                <p className='text-black'>{booking.notes}</p>
              </div>
            )}

            {/* Cancellation Reason */}
            {booking.status === 'cancelled' && booking.cancellationReason && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className='text-gray-400 text-sm mb-2'>Cancellation Reason</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className='text-red-800'>{booking.cancellationReason}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4">Customer Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <User size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>

              {booking.User?.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">{booking.User.phone}</span>
                </div>
              )}

              {booking.User?.email && (
                <div className="flex items-center">
                  <Mail size={16} className="text-gray-400 mr-3" />
                  <span className="text-sm text-gray-700">{booking.User.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Coach Information (if applicable) */}
          {booking.Coach && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4">Coach Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {booking.Coach.User ? `${booking.Coach.User.firstName} ${booking.Coach.User.lastName}` : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">Coach</p>
                  </div>
                </div>

                {booking.Coach.hourlyRate && (
                  <div className="flex items-center">
                    <DollarSign size={16} className="text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">₦{booking.Coach.hourlyRate}/hour</span>
                  </div>
                )}

                {booking.Coach.experience && (
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">{booking.Coach.experience} years experience</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              {/* Status-based actions */}
              {booking.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange('confirmed')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle size={16} />
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => handleStatusChange('cancelled')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <XCircle size={16} />
                    Cancel Booking
                  </button>
                </>
              )}

              {booking.status === 'confirmed' && (
                <>
                  <button
                    onClick={() => handleStatusChange('completed')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle size={16} />
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange('no_show')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <AlertCircle size={16} />
                    Mark as No Show
                  </button>
                </>
              )}

              {/* Always available actions */}
              <button
                onClick={() => navigate('/bookings')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Calendar size={16} />
                View All Bookings
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users size={16} />
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;