// import { useState, useEffect } from 'react';
// import {
//   TrendingUp
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';



// const FinancialOverview = () => {
//   // const { user, login } = useAuth();
//   const [activeButton, setActiveButton] = useState('transaction'); // 'transaction history' or 'payout history' or 'non pitch'

//   const bookings = [
//     {
//       id: 'BK001',
//       user: 'John Smith',
//       facility: 'Premium Tennis Court A',
//       sport: 'Tennis',
//       time: '10:00 AM - 11:00 AM',
//       date: '2025-06-08',
//       payment: 'N50000.00',
//       status: 'Confirmed'
//     },
//     {
//       id: 'BK002',
//       user: 'Sarah Johnson',
//       facility: 'Basketball Court 1',
//       sport: 'Basketball',
//       time: '2:00 PM - 3:30 PM',
//       date: '2025-06-08',
//       payment: 'N35000.00',
//       status: 'Pending'
//     },
//     {
//       id: 'BK003',
//       user: 'Mike Wilson',
//       facility: 'Swimming Pool',
//       sport: 'Swimming',
//       time: '6:00 AM - 7:00 AM',
//       date: '2025-06-09',
//       payment: 'N25000.00',
//       status: 'Confirmed'
//     },
//     {
//       id: 'BK004',
//       user: 'Emily Davis',
//       facility: 'Soccer Field B',
//       sport: 'Soccer',
//       time: '4:00 PM - 6:00 PM',
//       date: '2025-06-09',
//       payment: 'N80000.00',
//       status: 'Cancelled'
//     },
//     {
//       id: 'BK005',
//       user: 'David Brown',
//       facility: 'Gym Equipment Area',
//       sport: 'Fitness',
//       time: '8:00 AM - 9:00 AM',
//       date: '2025-06-10',
//       payment: 'N20000.00',
//       status: 'Confirmed'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Confirmed':
//         return 'bg-green-100 text-green-800';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };




//   return (
//     <div className="container mx-auto px-4">

     

//       <div className="max-w-[1125px]">


//         <div className='flex gap-x-6 pb-6'>

//           <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Total Earnings This Week</p>
//                 <p className='font-semibold text-3xl'>N150,000</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>

//   <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Pending Payouts</p>
//                 <p className='font-semibold text-3xl'>25</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>

//             <div className='border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-2'>

//             <div className='flex gap-x-6 items-center'>
//               <div>
//                 <p className='text-sm'>Last Payment Received</p>
//                 <p className='font-semibold text-3xl'>15</p>
//               </div>

//               <div>
//                 <p className='text-green-500'><TrendingUp size={16} /></p>
//                 <p className='text-green-500'>50.6%</p>
//               </div>

//             </div>
//           </div>




//         </div>



//          <div className='bg-gray-100 w-[310px] px-2 py-1 rounded-lg mb-6'>
//         <div className='flex'>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'transaction'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('transaction')}
//           >
//             Transaction History
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg transition-colors ${activeButton === 'payout'
//               ? 'bg-white text-black'
//               : 'bg-transparent text-gray-600 hover:bg-gray-200'
//               }`}
//             onClick={() => setActiveButton('payout')}
//           >
//             Payout History
//           </button>

//         </div>

//         {/* Optional: Show which is selected */}
//         {/* <div className="mt-4 text-sm text-gray-600">
//         Currently showing: {activeButton === 'recent' ? 'Recent Bookings' : "Today's Bookings"}
//       </div> */}

//       </div>



//         <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px]">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Service
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Amount Earned
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Commission Deducted
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Net Received
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Date
//                 </th>

//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {bookings.map((booking) => (
//                 <tr key={booking.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {booking.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.user}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.facility?.slice(0, 12)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.sport}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {booking.time}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {new Date(booking.date).toLocaleDateString()}
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
//                       onClick={() => alert(`Viewing details for booking ${booking.id}`)}
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default FinancialOverview;





// pages/FinancialOverview.jsx - Complete Payment Management
import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  User,
  Eye,
  Download,
  Filter,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  CreditCard,
  PieChart,
  BarChart3
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const FinancialOverview = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'payments', 'analytics'
  const [payments, setPayments] = useState([]);
  const [financialStats, setFinancialStats] = useState({
    totalEarnings: 0,
    monthlyEarnings: 0,
    weeklyEarnings: 0,
    pendingPayments: 0,
    completedPayments: 0,
    totalBookings: 0,
    averageBookingValue: 0
  });
  const [filters, setFilters] = useState({
    dateRange: '30d', // '7d', '30d', '90d', 'custom'
    status: 'all', // 'all', 'paid', 'pending', 'failed'
    startDate: '',
    endDate: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0,
    pages: 0
  });

  // Fetch financial stats
  const fetchFinancialStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      // Get facility dashboard stats (includes revenue data)
      const dashboardResponse = await axios.get(`${URL}/api/facilities/profile/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (dashboardResponse.data.success) {
        const stats = dashboardResponse.data.data;
        setFinancialStats(prev => ({
          ...prev,
          totalEarnings: parseFloat(stats.totalRevenue) || 0,
          monthlyEarnings: parseFloat(stats.monthlyRevenue) || 0,
          totalBookings: parseInt(stats.totalBookings) || 0,
          averageBookingValue: stats.totalBookings > 0 ? 
            (parseFloat(stats.totalRevenue) / parseInt(stats.totalBookings)) : 0
        }));
      }

      // Get bookings to calculate payment stats
      const bookingsResponse = await axios.get(`${URL}/api/facilities/profile/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { limit: 100 } // Get more data for calculations
      });

      if (bookingsResponse.data.success) {
        const bookings = bookingsResponse.data.data;
        
        // Calculate payment statistics
        const paidBookings = bookings.filter(b => b.paymentStatus === 'paid');
        const pendingBookings = bookings.filter(b => b.paymentStatus === 'pending');
        
        // Calculate weekly earnings (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weeklyPaidBookings = paidBookings.filter(b => 
          new Date(b.createdAt) >= weekAgo
        );
        const weeklyEarnings = weeklyPaidBookings.reduce((sum, booking) => 
          sum + parseFloat(booking.totalAmount), 0
        );

        setFinancialStats(prev => ({
          ...prev,
          weeklyEarnings,
          pendingPayments: pendingBookings.length,
          completedPayments: paidBookings.length
        }));
      }
    } catch (err) {
      console.error('Error fetching financial stats:', err);
    }
  };

  // Fetch payment data
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view payment data');
        return;
      }

      // Get bookings with payment information
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };

      if (filters.status !== 'all') {
        // Map our filter to booking status
        if (filters.status === 'paid') {
          params.status = 'completed'; // Only completed bookings should be paid
        } else if (filters.status === 'pending') {
          params.status = 'confirmed'; // Confirmed bookings might have pending payments
        }
      }

      if (filters.startDate && filters.endDate) {
        params.startDate = filters.startDate;
        params.endDate = filters.endDate;
      } else if (filters.dateRange !== 'custom') {
        const days = parseInt(filters.dateRange.replace('d', ''));
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        params.startDate = startDate.toISOString().split('T')[0];
      }

      const response = await axios.get(`${URL}/api/facilities/profile/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params
      });

      if (response.data.success) {
        let bookings = response.data.data;
        
        // Apply client-side search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          bookings = bookings.filter(booking => {
            const userName = booking.User ? 
              `${booking.User.firstName} ${booking.User.lastName}`.toLowerCase() : '';
            const bookingId = booking.id.toLowerCase();
            return userName.includes(searchLower) || bookingId.includes(searchLower);
          });
        }

        // Apply payment status filter
        if (filters.status !== 'all') {
          bookings = bookings.filter(booking => {
            if (filters.status === 'paid') return booking.paymentStatus === 'paid';
            if (filters.status === 'pending') return booking.paymentStatus === 'pending';
            if (filters.status === 'failed') return booking.paymentStatus === 'failed';
            return true;
          });
        }

        setPayments(bookings);
        setPagination(response.data.pagination || pagination);
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err.response?.data?.message || 'Failed to fetch payment data');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    
    if (filterName === 'dateRange' && value !== 'custom') {
      setFilters(prev => ({
        ...prev,
        startDate: '',
        endDate: ''
      }));
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount || 0).toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get payment status info
  const getPaymentStatusInfo = (status) => {
    switch (status) {
      case 'paid':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle size={14} className="text-green-600" />
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock size={14} className="text-yellow-600" />
        };
      case 'failed':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle size={14} className="text-red-600" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle size={14} className="text-gray-600" />
        };
    }
  };

  // Calculate percentage change (mock calculation)
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  // Export payments data
  const exportPayments = () => {
    // Create CSV content
    const headers = ['Date', 'Booking ID', 'Customer', 'Amount', 'Payment Status', 'Booking Status'];
    const csvContent = [
      headers.join(','),
      ...payments.map(payment => [
        formatDate(payment.createdAt),
        payment.id.slice(-8).toUpperCase(),
        payment.User ? `${payment.User.firstName} ${payment.User.lastName}` : 'N/A',
        payment.totalAmount,
        payment.paymentStatus || 'pending',
        payment.status
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Load data on component mount and filter changes
  useEffect(() => {
    fetchFinancialStats();
    fetchPayments();
  }, [pagination.page, filters.dateRange, filters.status]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPayments();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [filters.search]);

  // Overview Tab Content
  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Financial Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Earnings */}
        <div className="bg-white border border-black border-r-[6px] border-b-[4px] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {formatCurrency(financialStats.totalEarnings)}
              </p>
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp size={20} />
              <span className="ml-1 text-sm font-medium">+12.5%</span>
            </div>
          </div>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-white border border-black border-r-[6px] border-b-[4px] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {formatCurrency(financialStats.monthlyEarnings)}
              </p>
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp size={20} />
              <span className="ml-1 text-sm font-medium">+8.3%</span>
            </div>
          </div>
        </div>

        {/* Weekly Earnings */}
        <div className="bg-white border border-black border-r-[6px] border-b-[4px] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {formatCurrency(financialStats.weeklyEarnings)}
              </p>
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp size={20} />
              <span className="ml-1 text-sm font-medium">+15.2%</span>
            </div>
          </div>
        </div>

        {/* Average Booking Value */}
        <div className="bg-white border border-black border-r-[6px] border-b-[4px] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Booking Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {formatCurrency(financialStats.averageBookingValue)}
              </p>
            </div>
            <div className="flex items-center text-blue-500">
              <BarChart3 size={20} />
              <span className="ml-1 text-sm font-medium">+5.7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Status Overview */}
        <div className="bg-white border border-black border-r-[6px] border-b-[4px] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle size={20} className="text-green-500 mr-3" />
                <span className="text-gray-700">Completed Payments</span>
              </div>
              <span className="font-semibold text-gray-900">{financialStats.completedPayments}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock size={20} className="text-yellow-500 mr-3" />
                <span className="text-gray-700">Pending Payments</span>
              </div>
              <span className="font-semibold text-gray-900">{financialStats.pendingPayments}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard size={20} className="text-blue-500 mr-3" />
                <span className="text-gray-700">Total Bookings</span>
              </div>
              <span className="font-semibold text-gray-900">{financialStats.totalBookings}</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-black border-r-[6px] border-b-[4px] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {payments.slice(0, 5).map((payment, index) => (
              <div key={payment.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <User size={14} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {payment.User ? `${payment.User.firstName} ${payment.User.lastName}` : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(payment.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(payment.totalAmount)}
                  </p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${
                    getPaymentStatusInfo(payment.paymentStatus).color
                  }`}>
                    {getPaymentStatusInfo(payment.paymentStatus).icon}
                    <span className="ml-1 capitalize">{payment.paymentStatus || 'pending'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Payments Tab Content
  const renderPaymentsTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by customer or booking ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            />
          </div>

          {/* Date Range */}
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="custom">Custom range</option>
          </select>

          {/* Payment Status */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </>
          )}

          {/* Export Button */}
          <button
            onClick={exportPayments}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-md border border-black border-r-[6px] border-b-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Booking Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                    </div>
                  </td>
                </tr>
              ) : payments.length > 0 ? (
                payments.map((payment) => {
                  const paymentStatusInfo = getPaymentStatusInfo(payment.paymentStatus);
                  
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(payment.createdAt)}</div>
                        <div className="text-sm text-gray-500">{formatTime(payment.createdAt)}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{payment.id.slice(-8).toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {payment.bookingType} booking
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <User size={14} className="text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {payment.User ? `${payment.User.firstName} ${payment.User.lastName}` : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {payment.User?.phone || 'No phone'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(payment.totalAmount)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.participantsCount || 1} participant{(payment.participantsCount || 1) > 1 ? 's' : ''}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CreditCard size={14} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">Card Payment</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentStatusInfo.color}`}>
                          {paymentStatusInfo.icon}
                          <span className="ml-1 capitalize">{payment.paymentStatus || 'pending'}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          payment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          payment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => window.open(`/booking-details/${payment.id}`, '_blank')}
                          className="text-purple-600 hover:text-purple-900 flex items-center"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <DollarSign size={48} className="text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                      <p className="text-gray-500">
                        {filters.search || filters.status !== 'all' || filters.dateRange !== '30d' 
                          ? 'Try adjusting your filters' 
                          : 'No payments have been processed yet'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                <span className="px-3 py-1 bg-purple-500 text-white rounded-md">
                  {pagination.page}
                </span>
                
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-600">Track your payments, earnings, and financial performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchFinancialStats();
              fetchPayments();
            }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-gray-100 w-fit p-2 rounded-lg mb-6">
        <div className="flex gap-x-2">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'payments'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('payments')}
          >
            Payment History
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? renderOverviewTab() : renderPaymentsTab()}
    </div>
  );
};

export default FinancialOverview;