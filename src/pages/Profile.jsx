// //pages/Profile.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Edit,
//   Save,
//   X,
//   Camera,
//   Settings,
//   Shield,
//   Bell,
//   CreditCard,
//   UserCheck,
//   Star,
//   Trophy
// } from 'lucide-react';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// const Profile = () => {
//   const { user, setUser } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [stats, setStats] = useState({
//     totalBookings: 0,
//     completedBookings: 0,
//     reviewsGiven: 0,
//     avgRating: 0
//   });
  
//   const [editForm, setEditForm] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     dateOfBirth: '',
//     gender: '',
//     location: {
//       city: '',
//       state: '',
//       country: ''
//     },
//     preferences: {
//       notifications: true,
//       emailUpdates: true,
//       smsUpdates: false
//     }
//   });

//   // Fetch user profile
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('Please login to view profile');
//         return;
//       }

//       const response = await axios.get(`${URL}/users/profile`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         const profileData = response.data.data;
//         setProfile(profileData);
        
//         // Initialize edit form with current data
//         setEditForm({
//           firstName: profileData.firstName || '',
//           lastName: profileData.lastName || '',
//           phone: profileData.phone || '',
//           dateOfBirth: profileData.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : '',
//           gender: profileData.gender || '',
//           location: {
//             city: profileData.location?.city || '',
//             state: profileData.location?.state || '',
//             country: profileData.location?.country || 'Nigeria'
//           },
//           preferences: {
//             notifications: profileData.preferences?.notifications ?? true,
//             emailUpdates: profileData.preferences?.emailUpdates ?? true,
//             smsUpdates: profileData.preferences?.smsUpdates ?? false
//           }
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setError(err.response?.data?.message || 'Failed to fetch profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch user stats
//   const fetchUserStats = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) return;

//       // Fetch bookings
//       const bookingsResponse = await axios.get(`${URL}/users/bookings`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       // Fetch reviews
//       const reviewsResponse = await axios.get(`${URL}/users/reviews`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (bookingsResponse.data.success && reviewsResponse.data.success) {
//         const bookings = bookingsResponse.data.data;
//         const reviews = reviewsResponse.data.data;
        
//         const completedBookings = bookings.filter(b => b.status === 'completed');
        
//         // Calculate average rating received (if user is a coach/facility owner)
//         const avgRating = reviews.length > 0 
//           ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
//           : 0;

//         setStats({
//           totalBookings: bookings.length,
//           completedBookings: completedBookings.length,
//           reviewsGiven: reviews.length,
//           avgRating: avgRating.toFixed(1)
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching user stats:', err);
//     }
//   };

//   // Update profile
//   const updateProfile = async () => {
//     try {
//       setError('');
//       setSuccess('');
      
//       const token = localStorage.getItem('access_token');
//       const response = await axios.put(`${URL}/users/profile`, editForm, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setProfile(response.data.data);
//         setUser(response.data.data); // Update auth context
//         setEditing(false);
//         setSuccess('Profile updated successfully!');
        
//         // Clear success message after 3 seconds
//         setTimeout(() => setSuccess(''), 3000);
//       }
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setError(err.response?.data?.message || 'Failed to update profile');
//     }
//   };

//   // Handle input changes
//   const handleInputChange = (field, value) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setEditForm(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setEditForm(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   // Cancel editing
//   const cancelEdit = () => {
//     setEditing(false);
//     setError('');
    
//     // Reset form to current profile data
//     if (profile) {
//       setEditForm({
//         firstName: profile.firstName || '',
//         lastName: profile.lastName || '',
//         phone: profile.phone || '',
//         dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
//         gender: profile.gender || '',
//         location: {
//           city: profile.location?.city || '',
//           state: profile.location?.state || '',
//           country: profile.location?.country || 'Nigeria'
//         },
//         preferences: {
//           notifications: profile.preferences?.notifications ?? true,
//           emailUpdates: profile.preferences?.emailUpdates ?? true,
//           smsUpdates: profile.preferences?.smsUpdates ?? false
//         }
//       });
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not provided';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Calculate age
//   const calculateAge = (dateOfBirth) => {
//     if (!dateOfBirth) return null;
//     const today = new Date();
//     const birthDate = new Date(dateOfBirth);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
    
//     return age;
//   };

//   useEffect(() => {
//     fetchProfile();
//     fetchUserStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7042D2]"></div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500">Failed to load profile</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-8">
//       {/* Success/Error Messages */}
//       {success && (
//         <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-green-700">{success}</span>
//         </div>
//       )}
      
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//           <span className="text-sm text-red-700">{error}</span>
//         </div>
//       )}

//       {/* Profile Header */}
//       <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6 mb-6">
//         <div className="flex items-start justify-between">
//           <div className="flex items-center space-x-6">
//             {/* Profile Picture */}
//             <div className="relative">
//               <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                 {profile.profileImage ? (
//                   <img 
//                     src={profile.profileImage} 
//                     alt="Profile" 
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`
//                 )}
//               </div>
//               <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
//                 <Camera size={16} />
//               </button>
//             </div>

//             {/* Profile Info */}
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 {profile.firstName} {profile.lastName}
//               </h1>
//               <p className="text-gray-600 flex items-center mt-1">
//                 <Mail size={16} className="mr-2" />
//                 {profile.email}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Member since {formatDate(profile.createdAt)}
//               </p>
              
//               {/* Stats */}
//               <div className="flex items-center space-x-6 mt-3">
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Trophy size={16} className="mr-1 text-yellow-500" />
//                   <span>{stats.completedBookings} Completed</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Star size={16} className="mr-1 text-yellow-500" />
//                   <span>{stats.reviewsGiven} Reviews</span>
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <UserCheck size={16} className="mr-1 text-green-500" />
//                   <span>Verified</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Edit Button */}
//           <div className="flex space-x-2">
//             {editing ? (
//               <>
//                 <button
//                   onClick={updateProfile}
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
//                 >
//                   <Save size={16} className="mr-2" />
//                   Save
//                 </button>
//                 <button
//                   onClick={cancelEdit}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
//                 >
//                   <X size={16} className="mr-2" />
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => setEditing(true)}
//                 className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
//               >
//                 <Edit size={16} className="mr-2" />
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Personal Information */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Basic Info */}
//           <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* First Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                 {editing ? (
//                   <input
//                     type="text"
//                     value={editForm.firstName}
//                     onChange={(e) => handleInputChange('firstName', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.firstName || 'Not provided'}</p>
//                 )}
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                 {editing ? (
//                   <input
//                     type="text"
//                     value={editForm.lastName}
//                     onChange={(e) => handleInputChange('lastName', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg">{profile.lastName || 'Not provided'}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                 {editing ? (
//                   <input
//                     type="tel"
//                     value={editForm.phone}
//                     onChange={(e) => handleInputChange('phone', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
//                     <Phone size={16} className="mr-2 text-gray-500" />
//                     {profile.phone || 'Not provided'}
//                   </p>
//                 )}
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
//                 {editing ? (
//                   <input
//                     type="date"
//                     value={editForm.dateOfBirth}
//                     onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
//                     <Calendar size={16} className="mr-2 text-gray-500" />
//                     {formatDate(profile.dateOfBirth)}
//                     {profile.dateOfBirth && (
//                       <span className="ml-2 text-sm text-gray-500">
//                         (Age: {calculateAge(profile.dateOfBirth)})
//                       </span>
//                     )}
//                   </p>
//                 )}
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                 {editing ? (
//                   <select
//                     value={editForm.gender}
//                     onChange={(e) => handleInputChange('gender', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg capitalize">
//                     {profile.gender || 'Not specified'}
//                   </p>
//                 )}
//               </div>

//               {/* Email (Read-only) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-600 flex items-center">
//                   <Mail size={16} className="mr-2" />
//                   {profile.email}
//                   <span className="ml-2 text-xs text-green-600">Verified</span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Location Information */}
//           <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* City */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                 {editing ? (
//                   <input
//                     type="text"
//                     value={editForm.location.city}
//                     onChange={(e) => handleInputChange('location.city', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg">
//                     {profile.location?.city || 'Not provided'}
//                   </p>
//                 )}
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                 {editing ? (
//                   <input
//                     type="text"
//                     value={editForm.location.state}
//                     onChange={(e) => handleInputChange('location.state', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg">
//                     {profile.location?.state || 'Not provided'}
//                   </p>
//                 )}
//               </div>

//               {/* Country */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                 {editing ? (
//                   <select
//                     value={editForm.location.country}
//                     onChange={(e) => handleInputChange('location.country', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   >
//                     <option value="Nigeria">Nigeria</option>
//                     <option value="Ghana">Ghana</option>
//                     <option value="Kenya">Kenya</option>
//                     <option value="South Africa">South Africa</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 ) : (
//                   <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
//                     <MapPin size={16} className="mr-2 text-gray-500" />
//                     {profile.location?.country || 'Not provided'}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Preferences */}
//           <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
            
//             <div className="space-y-4">
//               {/* Notifications */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Bell size={20} className="mr-3 text-gray-500" />
//                   <div>
//                     <p className="font-medium text-gray-900">Push Notifications</p>
//                     <p className="text-sm text-gray-500">Receive notifications about bookings and updates</p>
//                   </div>
//                 </div>
//                 {editing ? (
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={editForm.preferences.notifications}
//                       onChange={(e) => handleInputChange('preferences.notifications', e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                   </label>
//                 ) : (
//                   <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {profile.preferences?.notifications ? 'Enabled' : 'Disabled'}
//                   </span>
//                 )}
//               </div>

//               {/* Email Updates */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Mail size={20} className="mr-3 text-gray-500" />
//                   <div>
//                     <p className="font-medium text-gray-900">Email Updates</p>
//                     <p className="text-sm text-gray-500">Receive email updates about new features and promotions</p>
//                   </div>
//                 </div>
//                 {editing ? (
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={editForm.preferences.emailUpdates}
//                       onChange={(e) => handleInputChange('preferences.emailUpdates', e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                   </label>
//                 ) : (
//                   <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.emailUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {profile.preferences?.emailUpdates ? 'Enabled' : 'Disabled'}
//                   </span>
//                 )}
//               </div>

//               {/* SMS Updates */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Phone size={20} className="mr-3 text-gray-500" />
//                   <div>
//                     <p className="font-medium text-gray-900">SMS Updates</p>
//                     <p className="text-sm text-gray-500">Receive SMS notifications for important updates</p>
//                   </div>
//                 </div>
//                 {editing ? (
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={editForm.preferences.smsUpdates}
//                       onChange={(e) => handleInputChange('preferences.smsUpdates', e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                   </label>
//                 ) : (
//                   <span className={`px-2 py-1 rounded-full text-xs ${profile.preferences?.smsUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {profile.preferences?.smsUpdates ? 'Enabled' : 'Disabled'}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Account Stats */}
//           <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
            
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Total Bookings</span>
//                 <span className="font-semibold text-purple-600">{stats.totalBookings}</span>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Completed</span>
//                 <span className="font-semibold text-green-600">{stats.completedBookings}</span>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Reviews Given</span>
//                 <span className="font-semibold text-blue-600">{stats.reviewsGiven}</span>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <span className="text-gray-600">Member Since</span>
//                 <span className="font-semibold text-gray-900">
//                   {new Date(profile.createdAt).getFullYear()}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Account Status */}
//           <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
            
//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
//                 <span className="text-sm text-gray-600">Email Verified</span>
//               </div>
              
//               <div className="flex items-center">
//                 <div className={`w-2 h-2 ${profile.phoneVerified ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-3`}></div>
//                 <span className="text-sm text-gray-600">
//                   Phone {profile.phoneVerified ? 'Verified' : 'Not Verified'}
//                 </span>
//               </div>
              
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
//                 <span className="text-sm text-gray-600">Account Active</span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
//             <div className="space-y-3">
//               <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//                 <Settings size={16} className="mr-3" />
//                 Account Settings
//               </button>
              
//               <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//                 <Shield size={16} className="mr-3" />
//                 Privacy Settings
//               </button>
              
//               <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
//                 <CreditCard size={16} className="mr-3" />
//                 Payment Methods
//               </button>
              
//               <button className="w-full flex items-center px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                 <X size={16} className="mr-3" />
//                 Delete Account
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;






//pages/Profile.jsx - Facility Profile Page
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
  Trophy,
  Building,
  Clock,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Globe,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [facilityData, setFacilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    avgRating: 0,
    totalReviews: 0,
    activeFacilities: 0
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

  const [facilityEditForm, setFacilityEditForm] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    amenities: [],
    operatingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '18:00', closed: false },
      sunday: { open: '09:00', close: '18:00', closed: false }
    }
  });

  // Fetch user profile and facility data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Please login to view profile');
        return;
      }

      // Fetch user profile
      const userResponse = await axios.get(`${URL}/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (userResponse.data.success) {
        const profileData = userResponse.data.data;
        setProfile(profileData);
        
        // Initialize user edit form
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

      // Fetch facility data
      const facilityResponse = await axios.get(`${URL}/api/facilities/my-facilities`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (facilityResponse.data.success && facilityResponse.data.data.length > 0) {
        const facility = facilityResponse.data.data[0]; // Get first facility
        setFacilityData(facility);
        
        // Initialize facility edit form
        setFacilityEditForm({
          name: facility.name || '',
          description: facility.description || '',
          address: facility.address || '',
          city: facility.city || '',
          state: facility.state || '',
          country: facility.country || 'Nigeria',
          phone: facility.phone || '',
          email: facility.email || '',
          website: facility.website || '',
          socialMedia: {
            facebook: facility.socialMedia?.facebook || '',
            instagram: facility.socialMedia?.instagram || '',
            twitter: facility.socialMedia?.twitter || ''
          },
          amenities: facility.amenities || [],
          operatingHours: facility.operatingHours || {
            monday: { open: '09:00', close: '18:00', closed: false },
            tuesday: { open: '09:00', close: '18:00', closed: false },
            wednesday: { open: '09:00', close: '18:00', closed: false },
            thursday: { open: '09:00', close: '18:00', closed: false },
            friday: { open: '09:00', close: '18:00', closed: false },
            saturday: { open: '09:00', close: '18:00', closed: false },
            sunday: { open: '09:00', close: '18:00', closed: false }
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

  // Fetch facility stats
  const fetchFacilityStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      // Fetch facility bookings
      const bookingsResponse = await axios.get(`${URL}/api/facilities/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Fetch facility reviews
      const reviewsResponse = await axios.get(`${URL}/api/facilities/reviews`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (bookingsResponse.data.success) {
        const bookings = bookingsResponse.data.data;
        const completedBookings = bookings.filter(b => b.status === 'completed');
        const totalRevenue = completedBookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);

        setStats(prev => ({
          ...prev,
          totalBookings: bookings.length,
          completedBookings: completedBookings.length,
          totalRevenue: totalRevenue
        }));
      }

      if (reviewsResponse.data.success) {
        const reviews = reviewsResponse.data.data;
        const avgRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
          : 0;

        setStats(prev => ({
          ...prev,
          totalReviews: reviews.length,
          avgRating: avgRating.toFixed(1)
        }));
      }
    } catch (err) {
      console.error('Error fetching facility stats:', err);
    }
  };

  // Update user profile
  const updateProfile = async () => {
    try {
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('access_token');
      const response = await axios.put(`${URL}/api/users/profile`, editForm, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setProfile(response.data.data);
        setUser(response.data.data);
        setEditing(false);
        setSuccess('Profile updated successfully!');
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Update facility data
  const updateFacility = async () => {
    try {
      if (!facilityData) return;
      
      setError('');
      setSuccess('');
      
      const token = localStorage.getItem('access_token');
      const response = await axios.put(`${URL}/api/facilities/${facilityData.id}`, facilityEditForm, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setFacilityData(response.data.data);
        setSuccess('Facility information updated successfully!');
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating facility:', err);
      setError(err.response?.data?.message || 'Failed to update facility information');
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

  // Handle facility input changes
  const handleFacilityInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFacilityEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFacilityEditForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditing(false);
    setError('');
    
    // Reset forms to current data
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Get verification status color
  const getVerificationStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Get verification status icon
  const getVerificationStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'rejected':
        return <X size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFacilityStats();
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
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}
      
      {/* {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )} */}

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Building size={32} />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                <Camera size={16} />
              </button>
            </div>

            {/* Profile Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-lg text-blue-600 font-medium">Facility Manager</p>
              <p className="text-gray-600 flex items-center mt-1">
                <Mail size={16} className="mr-2" />
                {profile.email}
              </p>
              
              {/* Facility Info */}
              {facilityData && (
                <div className="mt-2">
                  <p className="text-gray-700 font-medium flex items-center">
                    <Building size={16} className="mr-2" />
                    {facilityData.name}
                  </p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getVerificationStatusColor(facilityData.verificationStatus)}`}>
                    {getVerificationStatusIcon(facilityData.verificationStatus)}
                    <span className="ml-1 capitalize">{facilityData.verificationStatus || 'Pending'}</span>
                  </div>
                </div>
              )}
              
              {/* Stats */}
              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Trophy size={16} className="mr-1 text-yellow-500" />
                  <span>{stats.completedBookings} Completed</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span>{stats.avgRating} Rating</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign size={16} className="mr-1 text-green-500" />
                  <span>{formatCurrency(stats.totalRevenue)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex space-x-2">
            {editing ? (
              <>
                <button
                  onClick={() => {
                    updateProfile();
                    if (facilityData) updateFacility();
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save All
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                    <Phone size={16} className="mr-2 text-gray-500" />
                    {profile.phone || 'Not provided'}
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

          {/* Facility Information */}
          {facilityData && (
            <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Facility Information</h2>
              
              <div className="space-y-4">
                {/* Facility Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facility Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={facilityEditForm.name}
                      onChange={(e) => handleFacilityInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 rounded-lg">{facilityData.name}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  {editing ? (
                    <textarea
                      rows={3}
                      value={facilityEditForm.description}
                      onChange={(e) => handleFacilityInputChange('description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 rounded-lg">{facilityData.description || 'No description provided'}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  {editing ? (
                    <input
                      type="text"
                      value={facilityEditForm.address}
                      onChange={(e) => handleFacilityInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      {facilityData.address}
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facility Phone</label>
                    {editing ? (
                      <input
                        type="tel"
                        value={facilityEditForm.phone}
                        onChange={(e) => handleFacilityInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg">{facilityData.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    {editing ? (
                      <input
                        type="url"
                        value={facilityEditForm.website}
                        onChange={(e) => handleFacilityInputChange('website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-lg flex items-center">
                        {facilityData.website ? (
                          <>
                            <Globe size={16} className="mr-2 text-gray-500" />
                            <a href={facilityData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {facilityData.website}
                            </a>
                          </>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
            
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                    <p className="text-sm text-gray-500">Receive email updates about bookings and facility management</p>
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                    <p className="text-sm text-gray-500">Receive SMS notifications for urgent booking updates</p>
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
          {/* Facility Stats */}
          <div className="bg-white rounded-lg shadow-md border border-black border-r-[6px] border-b-[4px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-semibold text-blue-600">{stats.totalBookings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{stats.completedBookings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-semibold text-green-600">{formatCurrency(stats.totalRevenue)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Rating</span>
                <span className="font-semibold text-yellow-600 flex items-center">
                  <Star size={16} className="mr-1" />
                  {stats.avgRating}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Reviews</span>
                <span className="font-semibold text-purple-600">{stats.totalReviews}</span>
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
              
              {facilityData && (
                <div className="flex items-center">
                  <div className={`w-2 h-2 ${facilityData.verificationStatus === 'verified' ? 'bg-green-500' : facilityData.verificationStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full mr-3`}></div>
                  <span className="text-sm text-gray-600">
                    Facility {facilityData.verificationStatus === 'verified' ? 'Verified' : facilityData.verificationStatus === 'pending' ? 'Pending Verification' : 'Verification Rejected'}
                  </span>
                </div>
              )}
              
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
                Facility Settings
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Users size={16} className="mr-3" />
                Manage Staff
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <CreditCard size={16} className="mr-3" />
                Payment Settings
              </button>
              
              <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Shield size={16} className="mr-3" />
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;