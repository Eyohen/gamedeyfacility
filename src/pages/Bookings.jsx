// // pages/Bookings.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Calendar,
//   Clock,
//   User,
//   MapPin,
//   DollarSign,
//   Eye,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   RefreshCw,
//   Filter,
//   Search,
//   ChevronDown
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Bookings = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });

//   // Filter options
//   const statusOptions = [
//     { value: '', label: 'All Status' },
//     { value: 'pending', label: 'Pending' },
//     { value: 'confirmed', label: 'Confirmed' },
//     { value: 'cancelled', label: 'Cancelled' },
//     { value: 'completed', label: 'Completed' },
//     { value: 'no_show', label: 'No Show' }
//   ];

//   // Fetch bookings from API
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view bookings');
//         return;
//       }

//       const params = {
//         page: pagination.page,
//         limit: pagination.limit
//       };

//       if (statusFilter) params.status = statusFilter;
//       if (dateFilter) {
//         params.startDate = dateFilter;
//         params.endDate = dateFilter;
//       }

//       const response = await axios.get(`${URL}/api/facilities/profile/bookings`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         params
//       });

//       if (response.data.success) {
//         setBookings(response.data.data);
//         setPagination(response.data.pagination || pagination);
//       }
//     } catch (err) {
//       console.error('Error fetching bookings:', err);
//       setError(err.response?.data?.message || 'Failed to fetch bookings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update booking status
//   const updateBookingStatus = async (bookingId, status, reason = '') => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to update booking status');
//         return;
//       }

//       const response = await axios.patch(
//         `${URL}/api/bookings/${bookingId}/status`,
//         { status, cancellationReason: reason },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         // Update booking in local state
//         setBookings(prev => 
//           prev.map(booking => 
//             booking.id === bookingId 
//               ? { ...booking, status, cancellationReason: reason }
//               : booking
//           )
//         );

//         // Show success message
//         alert(`Booking ${status} successfully`);
//       }
//     } catch (err) {
//       console.error('Error updating booking status:', err);
//       alert(err.response?.data?.message || 'Failed to update booking status');
//     }
//   };

//   // Handle status change
//   const handleStatusChange = (booking, newStatus) => {
//     if (newStatus === 'cancelled') {
//       const reason = prompt('Please provide a reason for cancellation:');
//       if (reason !== null) { // User didn't cancel the prompt
//         updateBookingStatus(booking.id, newStatus, reason);
//       }
//     } else {
//       const confirmMessage = `Are you sure you want to ${newStatus} this booking?`;
//       if (window.confirm(confirmMessage)) {
//         updateBookingStatus(booking.id, newStatus);
//       }
//     }
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800 border-red-200';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'no_show':
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'confirmed':
//         return <CheckCircle size={16} className="text-green-600" />;
//       case 'pending':
//         return <Clock size={16} className="text-yellow-600" />;
//       case 'cancelled':
//         return <XCircle size={16} className="text-red-600" />;
//       case 'completed':
//         return <CheckCircle size={16} className="text-blue-600" />;
//       case 'no_show':
//         return <AlertCircle size={16} className="text-gray-600" />;
//       default:
//         return <AlertCircle size={16} className="text-gray-600" />;
//     }
//   };

//   // Format date and time
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString('en-US', { 
//         year: 'numeric', 
//         month: 'short', 
//         day: 'numeric' 
//       }),
//       time: date.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       })
//     };
//   };

//   // Format booking ID
//   const formatBookingId = (id) => {
//     return `#GDEY-${id.slice(-8).toUpperCase()}`;
//   };

//   // Filter bookings based on search term
//   const filteredBookings = bookings.filter(booking => {
//     if (!searchTerm) return true;

//     const searchLower = searchTerm.toLowerCase();
//     const userName = booking.User ? `${booking.User.firstName} ${booking.User.lastName}`.toLowerCase() : '';
//     const bookingId = formatBookingId(booking.id).toLowerCase();

//     return userName.includes(searchLower) || bookingId.includes(searchLower);
//   });

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   // Load data on component mount and when filters change
//   useEffect(() => {
//     fetchBookings();
//   }, [pagination.page, statusFilter, dateFilter]);

//   // Debounced search
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchBookings();
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchTerm]);

//   if (loading && bookings.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4">
//       {/* Header with filters */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//         {/* Facility Filter (if user has multiple facilities) */}
//         <div className='bg-gray-100 w-full lg:w-[400px] p-2 rounded-lg'>
//           <div className='flex gap-x-2'>
//             <button
//               className={`px-3 py-1 rounded-lg transition-colors flex-1 ${
//                 activeFilter === 'all'
//                   ? 'bg-white text-black'
//                   : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//               onClick={() => setActiveFilter('all')}
//             >
//               All Bookings
//             </button>
//             <button
//               className={`px-3 py-1 rounded-lg transition-colors flex-1 ${
//                 activeFilter === 'today'
//                   ? 'bg-white text-black'
//                   : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//               onClick={() => setActiveFilter('today')}
//             >
//               Today
//             </button>
//             <button
//               className={`px-3 py-1 rounded-lg transition-colors flex-1 ${
//                 activeFilter === 'upcoming'
//                   ? 'bg-white text-black'
//                   : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//               onClick={() => setActiveFilter('upcoming')}
//             >
//               Upcoming
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             <input
//               type="text"
//               placeholder="Search by user or booking ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
//             />
//           </div>

//           {/* Status Filter */}
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           >
//             {statusOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>

//           {/* Date Filter */}
//           <input
//             type="date"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           {/* Refresh Button */}
//           <button
//             onClick={fetchBookings}
//             className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <RefreshCw size={16} />
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Error Display */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <div className="flex items-center">
//             <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
//             <span className="text-sm text-red-700">{error}</span>
//           </div>
//         </div>
//       )}

//       {/* Bookings Table */}
//       <div className="py-6 max-w-full">
//         <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Booking ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   User
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Date & Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Duration
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Participants
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Payment
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredBookings.length > 0 ? (
//                 filteredBookings.map((booking) => {
//                   const startTime = formatDateTime(booking.startTime);
//                   const endTime = formatDateTime(booking.endTime);
//                   const duration = Math.round((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60));

//                   return (
//                     <tr key={booking.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {formatBookingId(booking.id)}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {booking.bookingType}
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
//                             <User size={16} className="text-purple-600" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {booking.User?.phone || 'No phone'}
//                             </div>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           <div className="flex items-center">
//                             <Calendar size={14} className="mr-1 text-gray-400" />
//                             {startTime.date}
//                           </div>
//                           <div className="flex items-center mt-1">
//                             <Clock size={14} className="mr-1 text-gray-400" />
//                             {startTime.time} - {endTime.time}
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {duration} hour{duration !== 1 ? 's' : ''}
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <div className="flex items-center">
//                           <User size={14} className="mr-1 text-gray-400" />
//                           {booking.participantsCount || 1}
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           ₦{parseFloat(booking.totalAmount).toLocaleString()}
//                         </div>
//                         <div className={`text-xs ${
//                           booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           {booking.paymentStatus || 'pending'}
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
//                           {getStatusIcon(booking.status)}
//                           <span className="ml-1 capitalize">{booking.status}</span>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => navigate(`/booking-details/${booking.id}`)}
//                             className="text-purple-600 hover:text-purple-900 flex items-center"
//                             title="View Details"
//                           >
//                             <Eye size={16} />
//                           </button>

//                           {/* Status Actions */}
//                           {booking.status === 'pending' && (
//                             <>
//                               <button
//                                 onClick={() => handleStatusChange(booking, 'confirmed')}
//                                 className="text-green-600 hover:text-green-900 flex items-center"
//                                 title="Confirm Booking"
//                               >
//                                 <CheckCircle size={16} />
//                               </button>
//                               <button
//                                 onClick={() => handleStatusChange(booking, 'cancelled')}
//                                 className="text-red-600 hover:text-red-900 flex items-center"
//                                 title="Cancel Booking"
//                               >
//                                 <XCircle size={16} />
//                               </button>
//                             </>
//                           )}

//                           {booking.status === 'confirmed' && (
//                             <>
//                               <button
//                                 onClick={() => handleStatusChange(booking, 'completed')}
//                                 className="text-blue-600 hover:text-blue-900 flex items-center"
//                                 title="Mark as Completed"
//                               >
//                                 <CheckCircle size={16} />
//                               </button>
//                               <button
//                                 onClick={() => handleStatusChange(booking, 'no_show')}
//                                 className="text-gray-600 hover:text-gray-900 flex items-center"
//                                 title="Mark as No Show"
//                               >
//                                 <AlertCircle size={16} />
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center">
//                       <Calendar size={48} className="text-gray-400 mb-4" />
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
//                       <p className="text-gray-500">
//                         {searchTerm || statusFilter || dateFilter 
//                           ? 'Try adjusting your search or filters' 
//                           : 'No bookings have been made yet'
//                         }
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="flex items-center justify-between mt-6">
//             <div className="text-sm text-gray-700">
//               Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//                 className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 Previous
//               </button>

//               {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
//                 const pageNumber = pagination.page - 2 + index;
//                 if (pageNumber < 1 || pageNumber > pagination.pages) return null;

//                 return (
//                   <button
//                     key={pageNumber}
//                     onClick={() => handlePageChange(pageNumber)}
//                     className={`px-3 py-1 border rounded-md ${
//                       pageNumber === pagination.page
//                         ? 'bg-purple-500 text-white border-purple-500'
//                         : 'border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     {pageNumber}
//                   </button>
//                 );
//               })}

//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.pages}
//                 className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Bookings;







// pages/Bookings.jsx
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  ChevronDown,
  Phone
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Filter options
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'no_show', label: 'No Show' }
  ];

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view bookings');
        return;
      }

      const params = {
        page: pagination.page,
        limit: pagination.limit
      };

      if (statusFilter) params.status = statusFilter;
      if (dateFilter) {
        params.startDate = dateFilter;
        params.endDate = dateFilter;
      }

      const response = await axios.get(`${URL}/api/facilities/profile/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params
      });

      if (response.data.success) {
        setBookings(response.data.data);
        setPagination(response.data.pagination || pagination);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, status, reason = '') => {
    try {
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
        // Update booking in local state
        setBookings(prev =>
          prev.map(booking =>
            booking.id === bookingId
              ? { ...booking, status, cancellationReason: reason }
              : booking
          )
        );

        // Show success message
        alert(`Booking ${status} successfully`);
      }
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert(err.response?.data?.message || 'Failed to update booking status');
    }
  };

  // Handle status change
  const handleStatusChange = (booking, newStatus) => {
    if (newStatus === 'cancelled') {
      const reason = prompt('Please provide a reason for cancellation:');
      if (reason !== null) { // User didn't cancel the prompt
        updateBookingStatus(booking.id, newStatus, reason);
      }
    } else {
      const confirmMessage = `Are you sure you want to ${newStatus} this booking?`;
      if (window.confirm(confirmMessage)) {
        updateBookingStatus(booking.id, newStatus);
      }
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'no_show':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={14} className="text-green-600" />;
      case 'pending':
        return <Clock size={14} className="text-yellow-600" />;
      case 'cancelled':
        return <XCircle size={14} className="text-red-600" />;
      case 'completed':
        return <CheckCircle size={14} className="text-blue-600" />;
      case 'no_show':
        return <AlertCircle size={14} className="text-gray-600" />;
      default:
        return <AlertCircle size={14} className="text-gray-600" />;
    }
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
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



  // Check if a booking is scheduled for today
  const isBookingToday = (bookingStartTime) => {
    const today = new Date();
    const bookingDate = new Date(bookingStartTime);

    return today.toDateString() === bookingDate.toDateString();
  };

  // Check if a booking is scheduled for future dates
  const isBookingUpcoming = (bookingStartTime) => {
    const today = new Date();
    const bookingDate = new Date(bookingStartTime);

    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    return bookingDate > today;
  };

  // Add these functions to get booking counts
  const getTodayCount = () => bookings.filter(booking => isBookingToday(booking.startTime)).length;
  const getUpcomingCount = () => bookings.filter(booking => isBookingUpcoming(booking.startTime)).length;

  // Replace your existing filteredBookings logic with this:
  const filteredBookings = bookings.filter(booking => {
    // First apply search term filter
    let matchesSearch = true;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const userName = booking.User ? `${booking.User.firstName} ${booking.User.lastName}`.toLowerCase() : '';
      const bookingId = formatBookingId(booking.id).toLowerCase();

      matchesSearch = userName.includes(searchLower) || bookingId.includes(searchLower);
    }

    if (!matchesSearch) return false;

    // Then apply date-based active filter
    switch (activeFilter) {
      case 'today':
        return isBookingToday(booking.startTime);
      case 'upcoming':
        return isBookingUpcoming(booking.startTime);
      case 'all':
      default:
        return true;
    }
  });


  // Filter bookings based on search term
  // const filteredBookings = bookings.filter(booking => {
  //   if (!searchTerm) return true;

  //   const searchLower = searchTerm.toLowerCase();
  //   const userName = booking.User ? `${booking.User.firstName} ${booking.User.lastName}`.toLowerCase() : '';
  //   const bookingId = formatBookingId(booking.id).toLowerCase();

  //   return userName.includes(searchLower) || bookingId.includes(searchLower);
  // });





  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchBookings();
  }, [pagination.page, statusFilter, dateFilter]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBookings();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  if (loading && bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4">
      {/* Header with filters - Mobile Responsive */}
      <div className="flex flex-col space-y-4">
        {/* Quick Filter Tabs - Mobile Responsive */}
        {/* <div className='bg-gray-100 w-full p-2 rounded-lg'>
          <div className='flex gap-x-1 sm:gap-x-2'>
            <button
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm ${
                activeFilter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All Bookings
            </button>
            <button
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm ${
                activeFilter === 'today'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('today')}
            >
              Today
            </button>
            <button
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm ${
                activeFilter === 'upcoming'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div> */}
        <div className='bg-gray-100 w-full p-2 rounded-lg'>
          <div className='flex gap-x-1 sm:gap-x-2'>
            <button
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm ${activeFilter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setActiveFilter('all')}
            >
              All Bookings
              <span className="ml-1 text-xs bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded-full">
                {bookings.length}
              </span>
            </button>
            <button
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm ${activeFilter === 'today'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setActiveFilter('today')}
            >
              Today
              <span className="ml-1 text-xs bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded-full">
                {getTodayCount()}
              </span>
            </button>
            <button
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-colors flex-1 text-xs sm:text-sm ${activeFilter === 'upcoming'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              onClick={() => setActiveFilter('upcoming')}
            >
              Upcoming
              <span className="ml-1 text-xs bg-gray-300 text-gray-700 px-1.5 py-0.5 rounded-full">
                {getUpcomingCount()}
              </span>
            </button>
          </div>
        </div>

        {/* Search and Filters - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Search - Full width on mobile */}
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by user or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm sm:text-base"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors sm:hidden"
          >
            <Filter size={16} />
            Filters
          </button>

          {/* Desktop Filters */}
          <div className="hidden sm:flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />

            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={16} />
              <span className="hidden lg:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="sm:hidden bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />

            <button
              onClick={() => {
                fetchBookings();
                setShowFilters(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <RefreshCw size={16} />
              Apply Filters
            </button>
          </div>
        )}
      </div>

      {/* Error Display - Mobile Responsive */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-700 break-words">{error}</span>
          </div>
        </div>
      )}

      {/* Mobile Card View (visible on small screens) */}
      <div className="sm:hidden space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const startTime = formatDateTime(booking.startTime);
            const endTime = formatDateTime(booking.endTime);
            const duration = Math.round((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60));

            return (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {formatBookingId(booking.id)}
                    </h3>
                    <p className="text-xs text-gray-500">{booking.bookingType}</p>
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <User size={16} className="text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.User?.phone || 'No phone'}
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1 text-gray-400" />
                    <span>{startTime.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1 text-gray-400" />
                    <span>{startTime.time} - {endTime.time}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={12} className="mr-1 text-gray-400" />
                    <span>{booking.participantsCount || 1} people</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={12} className="mr-1 text-gray-400" />
                    <span>₦{parseFloat(booking.totalAmount).toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mb-3">
                  <span className={`text-xs px-2 py-1 rounded ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    Payment: {booking.paymentStatus || 'pending'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/booking-details/${booking.id}`)}
                    className="flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm"
                  >
                    <Eye size={14} />
                    View Details
                  </button>

                  <div className="flex items-center space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(booking, 'confirmed')}
                          className="p-1 text-green-600 hover:text-green-700"
                          title="Confirm"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(booking, 'cancelled')}
                          className="p-1 text-red-600 hover:text-red-700"
                          title="Cancel"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}

                    {booking.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(booking, 'completed')}
                          className="p-1 text-blue-600 hover:text-blue-700"
                          title="Complete"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(booking, 'no_show')}
                          className="p-1 text-gray-600 hover:text-gray-700"
                          title="No Show"
                        >
                          <AlertCircle size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Calendar size={40} className="text-gray-400 mb-4 mx-auto" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 text-sm px-4">
              {searchTerm || statusFilter || dateFilter
                ? 'Try adjusting your search or filters'
                : 'No bookings have been made yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table View (hidden on small screens) */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[4px] sm:border-r-[6px] border-b-[2px] sm:border-b-[4px]">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Booking ID
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  User
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Date & Time
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden lg:table-cell">
                  Duration
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider hidden md:table-cell">
                  Participants
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Payment
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const startTime = formatDateTime(booking.startTime);
                  const endTime = formatDateTime(booking.endTime);
                  const duration = Math.round((new Date(booking.endTime) - new Date(booking.startTime)) / (1000 * 60 * 60));

                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatBookingId(booking.id)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.bookingType}
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <User size={16} className="text-purple-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {booking.User ? `${booking.User.firstName} ${booking.User.lastName}` : 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {booking.User?.phone || 'No phone'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1 text-gray-400" />
                            <span className="text-xs lg:text-sm">{startTime.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock size={12} className="mr-1 text-gray-400" />
                            <span className="text-xs lg:text-sm">{startTime.time} - {endTime.time}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                        {duration} hour{duration !== 1 ? 's' : ''}
                      </td>

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        <div className="flex items-center">
                          <User size={12} className="mr-1 text-gray-400" />
                          {booking.participantsCount || 1}
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₦{parseFloat(booking.totalAmount).toLocaleString()}
                        </div>
                        <div className={`text-xs ${booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {booking.paymentStatus || 'pending'}
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize hidden sm:inline">{booking.status}</span>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-1 lg:space-x-2">
                          <button
                            onClick={() => navigate(`/booking-details/${booking.id}`)}
                            className="text-purple-600 hover:text-purple-900 flex items-center p-1"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Status Actions */}
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking, 'confirmed')}
                                className="text-green-600 hover:text-green-900 flex items-center p-1"
                                title="Confirm Booking"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking, 'cancelled')}
                                className="text-red-600 hover:text-red-900 flex items-center p-1"
                                title="Cancel Booking"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}

                          {booking.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking, 'completed')}
                                className="text-blue-600 hover:text-blue-900 flex items-center p-1"
                                title="Mark as Completed"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking, 'no_show')}
                                className="text-gray-600 hover:text-gray-900 flex items-center p-1"
                                title="Mark as No Show"
                              >
                                <AlertCircle size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Calendar size={48} className="text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-500">
                        {searchTerm || statusFilter || dateFilter
                          ? 'Try adjusting your search or filters'
                          : 'No bookings have been made yet'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Mobile Responsive */}
        {pagination.pages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
            </div>

            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                Prev
              </button>

              {[...Array(Math.min(5, pagination.pages))].map((_, index) => {
                const pageNumber = pagination.page - 2 + index;
                if (pageNumber < 1 || pageNumber > pagination.pages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-2 sm:px-3 py-1 border rounded-md text-sm ${pageNumber === pagination.page
                        ? 'bg-purple-500 text-white border-purple-500'
                        : 'border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;