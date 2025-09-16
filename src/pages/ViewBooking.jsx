// pages/ViewBooking.jsx - Facility Frontend
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Edit,
  CreditCard,
  FileText,
  Star
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const ViewBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  // Fetch booking details
  useEffect(() => {
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

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  // Update booking status
  const updateBookingStatus = async (status, reason = '') => {
    try {
      setUpdating(true);
      const token = localStorage.getItem('access_token');
      
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
    const statusMap = {
      confirmed: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <CheckCircle size={20} className="text-green-600" />,
        bgColor: 'bg-green-50'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <Clock size={20} className="text-yellow-600" />,
        bgColor: 'bg-yellow-50'
      },
      cancelled: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: <XCircle size={20} className="text-red-600" />,
        bgColor: 'bg-red-50'
      },
      completed: {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <CheckCircle size={20} className="text-blue-600" />,
        bgColor: 'bg-blue-50'
      },
      no_show: {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: <AlertCircle size={20} className="text-gray-600" />,
        bgColor: 'bg-gray-50'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The booking you are looking for does not exist.'}</p>
          <button 
            onClick={() => navigate('/bookings')}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const startTime = formatDateTime(booking.startTime);
  const endTime = formatDateTime(booking.endTime);
  const duration = Math.round((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60));
  const statusInfo = getStatusInfo(booking.status);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Bookings
        </button>
        
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900">{formatBookingId(booking.id)}</h1>
          <p className="text-gray-500 capitalize">{booking.bookingType} Booking</p>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`${statusInfo.bgColor} border ${statusInfo.color.split(' ')[2]} rounded-lg p-4 mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {statusInfo.icon}
            <span className={`ml-2 font-medium capitalize ${statusInfo.color.split(' ')[1]}`}>
              {booking.status} {booking.status === 'cancelled' && '- Cancelled'}
            </span>
          </div>
          
          {/* Status Actions */}
          <div className="flex gap-2">
            {booking.status === 'pending' && (
              <>
                <button
                  onClick={() => handleStatusChange('confirmed')}
                  disabled={updating}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle size={16} />
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange('cancelled')}
                  disabled={updating}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <XCircle size={16} />
                  Cancel
                </button>
              </>
            )}
            
            {booking.status === 'confirmed' && (
              <>
                <button
                  onClick={() => handleStatusChange('completed')}
                  disabled={updating}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle size={16} />
                  Mark Complete
                </button>
                <button
                  onClick={() => handleStatusChange('no_show')}
                  disabled={updating}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <AlertCircle size={16} />
                  No Show
                </button>
              </>
            )}
          </div>
        </div>
        
        {booking.cancellationReason && (
          <div className="mt-3 pt-3 border-t border-red-200">
            <p className="text-sm text-red-700">
              <strong>Cancellation Reason:</strong> {booking.cancellationReason}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Session Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="mr-2 text-purple-600" size={20} />
              Booking Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                  <p className="text-gray-900">{startTime.date}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Start Time</label>
                  <p className="text-gray-900 flex items-center">
                    <Clock size={16} className="mr-1 text-gray-400" />
                    {startTime.time}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Participants</label>
                  <p className="text-gray-900 flex items-center">
                    <User size={16} className="mr-1 text-gray-400" />
                    {booking.participantsCount || 1} people
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Duration</label>
                  <p className="text-gray-900">{duration} hour{duration !== 1 ? 's' : ''}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">End Time</label>
                  <p className="text-gray-900 flex items-center">
                    <Clock size={16} className="mr-1 text-gray-400" />
                    {endTime.time}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Booking Type</label>
                  <p className="text-gray-900 capitalize">{booking.bookingType}</p>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-500 mb-2">Notes</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Coach Details (if applicable) */}
          {booking.Coach && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="mr-2 text-purple-600" size={20} />
                Coach Details
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Coach Name</label>
                  <p className="text-gray-900 font-medium">
                    {booking.Coach.User ? `${booking.Coach.User.firstName} ${booking.Coach.User.lastName}` : 'N/A'}
                  </p>
                </div>
                
                {booking.Coach.specialties && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Specialties</label>
                    <p className="text-gray-900">{booking.Coach.specialties.join(', ')}</p>
                  </div>
                )}
                
                {booking.Coach.hourlyRate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Hourly Rate</label>
                    <p className="text-gray-900">₦{parseFloat(booking.Coach.hourlyRate).toLocaleString()}/hour</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="mr-2 text-purple-600" size={20} />
              Client Details
            </h2>
            
            {booking.User ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <User size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {booking.User.firstName} {booking.User.lastName}
                    </p>
                    <p className="text-sm text-gray-500">Client</p>
                  </div>
                </div>
                
                {booking.User.phone && (
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-900">{booking.User.phone}</span>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  {booking.User.phone && (
                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                      <Phone size={14} />
                      Call
                    </button>
                  )}
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    <MessageSquare size={14} />
                    Message
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No client information available</p>
            )}
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="mr-2 text-purple-600" size={20} />
              Payment Details
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-medium text-gray-900">
                  ₦{parseFloat(booking.totalAmount).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Duration</span>
                <span className="text-gray-900">{duration}h</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Participants</span>
                <span className="text-gray-900">{booking.participantsCount || 1}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Final Total</span>
                  <span className="font-bold text-gray-900 text-lg">
                    ₦{parseFloat(booking.totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="mt-3">
                <span className="text-sm text-gray-500">Payment Status: </span>
                <span className={`text-sm font-medium ${
                  booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {booking.paymentStatus || 'Pending'}
                </span>
              </div>
              
              {booking.Payment && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    Payment ID: {booking.Payment.transactionId}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Via {booking.Payment.paymentGateway}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Edit size={16} />
                Edit Booking
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <FileText size={16} />
                Generate Receipt
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <MessageSquare size={16} />
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;