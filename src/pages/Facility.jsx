// src/pages/Facility.jsx - Complete Integration
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  Copy,
  RefreshCw,
  Calendar,
  ChevronDown,
  ExternalLink,
  X,
  Plus,
  MapPin,
  Clock,
  Star,
  Users,
  Edit,
  Trash2,
  AlertCircle,
  Building,
  DollarSign
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import stadium1 from '../assets/stadium1.png';
import stadium2 from '../assets/stadium2.png';
import stadium3 from '../assets/stadium3.png';

const Facility = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [myFacility, setMyFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sport: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    amenities: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my_facility'

  // Fetch all facilities (public view)
  const fetchAllFacilities = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        page: 1,
        limit: 20
      };
      
      if (searchTerm) params.search = searchTerm;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.amenities) params.amenities = filters.amenities;

      const response = await axios.get(`${URL}/api/facilities`, { params });
      
      if (response.data.success) {
        setFacilities(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching facilities:', err);
      setError(err.response?.data?.message || 'Failed to fetch facilities');
    } finally {
      setLoading(false);
    }
  };

  // Fetch my facility (for facility owners)
  const fetchMyFacility = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view your facility');
        return;
      }

      const response = await axios.get(`${URL}/api/facilities/profile/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setMyFacility(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching my facility:', err);
      if (err.response?.status === 404) {
        setMyFacility(null); // No facility found for this user
      } else {
        setError(err.response?.data?.message || 'Failed to fetch your facility');
      }
    } finally {
      setLoading(false);
    }
  };

  // Format operating hours for display
  const formatOperatingHours = (operatingHours) => {
    if (!operatingHours) return 'Hours not specified';
    
    // Assuming operatingHours is an object like { monday: { open: "08:00", close: "18:00" }, ... }
    const days = Object.keys(operatingHours);
    if (days.length === 0) return 'Hours not specified';
    
    const firstDay = operatingHours[days[0]];
    if (!firstDay || !firstDay.open || !firstDay.close) return 'Hours not specified';
    
    return `${firstDay.open} - ${firstDay.close}`;
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'Price not set';
    return `₦${parseFloat(price).toLocaleString()}/hr`;
  };

  // Format amenities
  const formatAmenities = (amenities) => {
    if (!amenities || amenities.length === 0) return 'No amenities listed';
    return amenities.slice(0, 3).join(', ') + (amenities.length > 3 ? '...' : '');
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    if (activeTab === 'all') {
      fetchAllFacilities();
    }
    setShowFilters(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      sport: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      amenities: ''
    });
    setSearchTerm('');
    if (activeTab === 'all') {
      fetchAllFacilities();
    }
  };

  // Handle facility click
  const handleFacilityClick = (facility) => {
    navigate(`/facility/${facility.id}`, { state: { facility } });
  };

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      fetchAllFacilities();
    } else if (activeTab === 'my_facility') {
      fetchMyFacility();
    }
  }, [activeTab]);

  // Search debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeTab === 'all') {
        fetchAllFacilities();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with tabs and actions */}
      <div className="flex justify-between items-center mb-6">
        {/* Tab Navigation */}
        <div className='bg-gray-100 w-[300px] p-2 rounded-lg'>
          <div className='flex gap-x-2'>
            <button
              className={`px-4 py-1 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Facilities
            </button>
            <button
              className={`px-4 py-1 rounded-lg transition-colors ${
                activeTab === 'my_facility'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('my_facility')}
            >
              My Facility
            </button>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {activeTab === 'all' && (
            <>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>

              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                Filters
              </button>
            </>
          )}

          {/* Create Facility Button */}
          <button 
            onClick={() => navigate('/create-facility')} 
            className='bg-[#946BEF] text-white px-6 py-2 rounded-lg hover:bg-[#7c3aed] transition-colors flex items-center gap-2'
          >
            <Plus size={16} />
            {activeTab === 'my_facility' && !myFacility ? 'Create Facility' : 'Create New Facility'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && activeTab === 'all' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any rating</option>
                <option value="3">3+ stars</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <input
                type="text"
                placeholder="e.g., Parking,WiFi"
                value={filters.amenities}
                onChange={(e) => handleFilterChange('amenities', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={applyFilters}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'all' ? (
        // All Facilities View
        facilities.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px]'>
            {facilities.map((facility, index) => (
              <div 
                key={facility.id} 
                className='border border-black rounded-xl cursor-pointer hover:shadow-lg transition-shadow'
                onClick={() => handleFacilityClick(facility)}
              >
                <img 
                  src={index % 3 === 0 ? stadium1 : index % 3 === 1 ? stadium2 : stadium3} 
                  className='w-full h-48 object-cover rounded-t-xl' 
                  alt={facility.name}
                />
                <div className='px-4 py-4'>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className='font-semibold text-lg'>{facility.name}</h3>
                    {facility.averageRating && (
                      <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{facility.averageRating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className='max-w-[280px] text-gray-500 text-sm mb-3 line-clamp-2'>
                    {facility.description || 'A premium sports facility with excellent amenities.'}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className='flex justify-between items-center'>
                      <div className="flex items-center text-gray-600">
                        <Clock size={14} className="mr-1" />
                        <span>{formatOperatingHours(facility.operatingHours)}</span>
                      </div>
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign size={14} className="mr-1" />
                        <span>{formatPrice(facility.pricePerHour)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin size={14} className="mr-1" />
                      <span className="truncate">{facility.address || 'Location not specified'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users size={14} className="mr-1" />
                      <span>Capacity: {facility.capacity || 'Not specified'}</span>
                    </div>
                    
                    {facility.amenities && facility.amenities.length > 0 && (
                      <div className="text-gray-500 text-xs">
                        <span className="font-medium">Amenities:</span> {formatAmenities(facility.amenities)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )
      ) : (
        // My Facility View
        myFacility ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{myFacility.name}</h2>
                <p className="text-gray-600 mt-1">{myFacility.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit-facility/${myFacility.id}`)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/facility/${myFacility.id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Facility Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      myFacility.status === 'active' ? 'bg-green-100 text-green-800' : 
                      myFacility.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {myFacility.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verification:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      myFacility.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' : 
                      myFacility.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {myFacility.verificationStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price/Hour:</span>
                    <span className="font-semibold">{formatPrice(myFacility.pricePerHour)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span>{myFacility.capacity} people</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Performance</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Bookings:</span>
                    <span className="font-semibold">{myFacility.totalBookings || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating:</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span className="font-semibold">{myFacility.averageRating || 'No ratings'}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews:</span>
                    <span className="font-semibold">{myFacility.totalReviews || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/bookings')}
                    className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Bookings
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/financial-overview')}
                    className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Financial Overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Building size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No facility found</h3>
            <p className="text-gray-500 mb-4">
              You haven't created a facility yet. Create one to start receiving bookings.
            </p>
            <button 
              onClick={() => navigate('/create-facility')} 
              className='bg-[#946BEF] text-white px-6 py-2 rounded-lg hover:bg-[#7c3aed] transition-colors flex items-center gap-2 mx-auto'
            >
              <Plus size={16} />
              Create Your First Facility
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Facility;