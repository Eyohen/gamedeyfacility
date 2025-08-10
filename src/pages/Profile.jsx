//pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Shield,
  Bell,
  CreditCard,
  UserCheck,
  Star,
  Trophy
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    reviewsGiven: 0,
    avgRating: 0
  });
  
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: {
      city: '',
      state: '',
      country: ''
    },
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false
    }
  });

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view profile');
        return;
      }

      const response = await axios.get(`${URL}/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        const profileData = response.data.data;
        setProfile(profileData);
        
        // Initialize edit form with current data
        setEditForm({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          phone: profileData.phone || '',
          dateOfBirth: profileData.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : '',
          gender: profileData.gender || '',
          location: {
            city: profileData.location?.city || '',
            state: profileData.location?.state || '',
            country: profileData.location?.country || 'Nigeria'
          },
          preferences: {
            notifications: profileData.preferences?.notifications ?? true,
            emailUpdates: profileData.preferences?.emailUpdates ?? true,
            smsUpdates: profileData.preferences?.smsUpdates ?? false
          }
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user stats
  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      // Fetch bookings
      const bookingsResponse = await axios.get(`${URL}/users/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Fetch reviews
      const reviewsResponse = await axios.get(`${URL}/users/reviews`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (bookingsResponse.data.success && reviewsResponse.data.success) {
        const bookings = bookingsResponse.data.data;
        const reviews = reviewsResponse.data.data;
        
        const completedBookings = bookings.filter(b => b.status === 'completed');
        
        // Calculate average rating received (if user is a coach/facility owner)
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
          : 0;

        setStats({
          totalBookings: bookings.length,
          completedBookings: completedBookings.length,
          reviewsGiven: reviews.length,
          avgRating: avgRating.toFixed(1)
        });
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  };

  // Update profile
  const updateProfile = async () => {
    try {
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('access_token');
      const response = await axios.put(`${URL}/users/profile`, editForm, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setProfile(response.data.data);
        setUser(response.data.data); // Update auth context
        setEditing(false);
        setSuccess('Profile updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditing(false);
    setError('');
    
    // Reset form to current profile data
    if (profile) {
      setEditForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
        gender: profile.gender || '',
        location: {
          city: profile.location?.city || '',
          state: profile.location?.state || '',
          country: profile.location?.country || 'Nigeria'
        },
        preferences: {
          notifications: profile.preferences?.notifications ?? true,
          emailUpdates: profile.preferences?.emailUpdates ?? true,
          smsUpdates: profile.preferences?.smsUpdates ?? false
        }
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  useEffect(() => {
    fetchProfile();
    fetchUserStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
                <Camera size={16} />
              </button>
            </div>

            {/* Profile Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-gray-600 flex items-center mt-1">
                <Mail size={16} className="mr-2" />
                {profile.email}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Member since {formatDate(profile.createdAt)}
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Trophy size={16} className="mr-1 text-yellow-500" />
                  <span>{stats.completedBookings} Completed</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span>{stats.reviewsGiven} Reviews</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UserCheck size={16} className="mr-1 text-green-500" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex space-x-2">
            {editing ? (
              <>
                <button
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.firstName || 'Not provided'}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.lastName || 'Not provided'}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                    <Phone size={16} className="mr-2 text-gray-500" />
                    {profile.phone || 'Not provided'}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                {editing ? (
                  <input
                    type="date"
                    value={editForm.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    {formatDate(profile.dateOfBirth)}
                    {profile.dateOfBirth && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Age: {calculateAge(profile.dateOfBirth)})
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                {editing ? (
                  <select
                    value={editForm.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg capitalize">
                    {profile.gender || 'Not specified'}
                  </p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-600 flex items-center">
                  <Mail size={16} className="mr-2" />
                  {profile.email}
                  <span className="ml-2 text-xs text-green-600">Verified</span>
                </p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.location.city}
                    onChange={(e) => handleInputChange('location.city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {profile.location?.city || 'Not provided'}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.location.state}
                    onChange={(e) => handleInputChange('location.state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg">
                    {profile.location?.state || 'Not provided'}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                {editing ? (
                  <select
                    value={editForm.location.country}
                    onChange={(e) => handleInputChange('location.country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-500" />
                    {profile.location?.country || 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
            
            <div className="space-y-4">
              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={20} className="mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications about bookings and updates</p>
                  </div>
                </div>
                {editing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.preferences.notifications}
                      onChange={(e) => handleInputChange('preferences.notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.preferences?.notifications ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>

              {/* Email Updates */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail size={20} className="mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email Updates</p>
                    <p className="text-sm text-gray-500">Receive email updates about new features and promotions</p>
                  </div>
                </div>
                {editing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.preferences.emailUpdates}
                      onChange={(e) => handleInputChange('preferences.emailUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.emailUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.preferences?.emailUpdates ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>

              {/* SMS Updates */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone size={20} className="mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">SMS Updates</p>
                    <p className="text-sm text-gray-500">Receive SMS notifications for important updates</p>
                  </div>
                </div>
                {editing ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.preferences.smsUpdates}
                      onChange={(e) => handleInputChange('preferences.smsUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.smsUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.preferences?.smsUpdates ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-semibold text-purple-600">{stats.totalBookings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{stats.completedBookings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Reviews Given</span>
                <span className="font-semibold text-blue-600">{stats.reviewsGiven}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold text-gray-900">
                  {new Date(profile.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Email Verified</span>
              </div>
              
              <div className="flex items-center">
                <div className={`w-2 h-2 ${profile.phoneVerified ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-3`}></div>
                <span className="text-sm text-gray-600">
                  Phone {profile.phoneVerified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Account Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings size={16} className="mr-3" />
                Account Settings
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Shield size={16} className="mr-3" />
                Privacy Settings
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <CreditCard size={16} className="mr-3" />
                Payment Methods
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <X size={16} className="mr-3" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;