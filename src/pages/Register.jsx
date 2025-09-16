// // pages/Register.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   RiMailLine,
//   RiLockLine,
//   RiEyeLine,
//   RiEyeOffLine,
//   RiErrorWarningLine,
//   RiUser3Line,
//   RiPhoneLine,
//   RiHomeLine,
//   RiMoneyDollarCircleLine,
//   RiCheckboxCircleLine
// } from 'react-icons/ri';
// import { useAuth } from '../context/AuthContext';
// import authpic from '../assets/authpic.png';
// import logo from '../assets/logo.png';
// import { LuUserRoundPlus } from "react-icons/lu";

// const FacilityRegistration = () => {
//   const navigate = useNavigate();
//   const { register } = useAuth();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Personal Info
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
    
//     // Facility Info
//     facilityName: '',
//     facilityAddress: '',
//     facilityDescription: '',
//     pricePerHour: '',
//     capacity: '',
//     amenities: []
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const amenitiesList = [
//     'Parking', 'Restrooms', 'Changing Rooms', 'Water Fountain', 
//     'First Aid', 'Equipment Rental', 'WiFi', 'Air Conditioning',
//     'Lighting', 'Sound System', 'Security', 'Food & Drinks'
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     setError('');
//     setSuccess('');
//   };

//   const handleAmenityChange = (amenity) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter(a => a !== amenity)
//         : [...prev.amenities, amenity]
//     }));
//   };

//   const validateStep1 = () => {
//     if (!formData.firstName.trim()) {
//       setError('First name is required');
//       return false;
//     }
//     if (!formData.lastName.trim()) {
//       setError('Last name is required');
//       return false;
//     }
//     if (!formData.email.trim()) {
//       setError('Email is required');
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }
//     if (!formData.password) {
//       setError('Password is required');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     return true;
//   };

//   const validateStep2 = () => {
//     if (!formData.facilityName.trim()) {
//       setError('Facility name is required');
//       return false;
//     }
//     if (formData.facilityName.length < 3) {
//       setError('Facility name must be at least 3 characters');
//       return false;
//     }
//     if (!formData.facilityAddress.trim()) {
//       setError('Facility address is required');
//       return false;
//     }
//     if (!formData.pricePerHour || parseFloat(formData.pricePerHour) <= 0) {
//       setError('Valid price per hour is required');
//       return false;
//     }
//     if (!formData.capacity || parseInt(formData.capacity) <= 0) {
//       setError('Valid capacity is required');
//       return false;
//     }
//     return true;
//   };

//   const handleNext = () => {
//     if (currentStep === 1 && validateStep1()) {
//       setCurrentStep(2);
//       setError('');
//     }
//   };

//   const handleBack = () => {
//     if (currentStep === 2) {
//       setCurrentStep(1);
//       setError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log('📝 Form submitted!'); // Debug log
//     console.log('📋 Current form data:', formData); // Debug log

//     if (!validateStep2()) {
//       console.log('❌ Step 2 validation failed'); // Debug log
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     setSuccess('');
    
//     try {
//       console.log('🚀 Calling register function...'); // Debug log
//       const result = await register(formData);
//       console.log('📄 Register result:', result); // Debug log

//       if (result.success) {
//         console.log('✅ Registration successful:', result.data);
//         setSuccess('Account created successfully! Redirecting to dashboard...');
        
//         // Wait a moment to show success message, then redirect
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000);
//       } else {
//         console.log('❌ Registration failed:', result.message);
//         setError(result.message || 'Registration failed');
//       }
//     } catch (err) {
//       console.error('💥 Registration error:', err);
//       setError('An unexpected error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderStep1 = () => (
//     <>
//       <h2 className="mt-4 text-3xl font-semibold text-gray-900">
//         Create Your Account
//       </h2>
//       <p className="mt-1 text-sm text-gray-600 font-medium">
//         Step 1: Personal Information
//       </p>

//       <div className="space-y-6 mt-6">
//         {/* Name Fields */}
//         <div className='flex gap-x-4'>
//           <div className="flex-1">
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//               First Name *
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <RiUser3Line className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="firstName"
//                 name="firstName"
//                 type="text"
//                 required
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="First name"
//               />
//             </div>
//           </div>

//           <div className="flex-1">
//             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//               Last Name *
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <RiUser3Line className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="lastName"
//                 name="lastName"
//                 type="text"
//                 required
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Last name"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Email Field */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email address *
//           </label>
//           <div className="mt-1 relative rounded-md shadow-sm">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <RiMailLine className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>
//         </div>

//         {/* Phone Field */}
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//             Phone Number (Optional)
//           </label>
//           <div className="mt-1 relative rounded-md shadow-sm">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <RiPhoneLine className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               id="phone"
//               name="phone"
//               type="tel"
//               value={formData.phone}
//               onChange={handleChange}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Phone number"
//             />
//           </div>
//         </div>

//         {/* Password Fields */}
//         <div className="flex gap-x-4">
//           <div className="flex-1">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password *
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <RiLockLine className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                 ) : (
//                   <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                 )}
//               </button>
//             </div>
//             <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
//           </div>

//           <div className="flex-1">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm Password *
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <RiLockLine className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Confirm password"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? (
//                   <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                 ) : (
//                   <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Next Button */}
//         <div>
//           <button
//             type="button"
//             onClick={handleNext}
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]"
//           >
//             Next: Facility Details
//           </button>
//         </div>
//       </div>
//     </>
//   );

//   const renderStep2 = () => (
//     <>
//       <h2 className="mt-4 text-3xl font-semibold text-gray-900">
//         Facility Information
//       </h2>
//       <p className="mt-1 text-sm text-gray-600 font-medium">
//         Step 2: Tell us about your facility
//       </p>

//       <div className="space-y-6 mt-6">
//         {/* Facility Name */}
//         <div>
//           <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700">
//             Facility Name *
//           </label>
//           <div className="mt-1 relative rounded-md shadow-sm">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <RiHomeLine className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               id="facilityName"
//               name="facilityName"
//               type="text"
//               required
//               value={formData.facilityName}
//               onChange={handleChange}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="e.g., Downtown Sports Center"
//             />
//           </div>
//         </div>

//         {/* Facility Address */}
//         <div>
//           <label htmlFor="facilityAddress" className="block text-sm font-medium text-gray-700">
//             Facility Address *
//           </label>
//           <div className="mt-1">
//             <textarea
//               id="facilityAddress"
//               name="facilityAddress"
//               rows={3}
//               required
//               value={formData.facilityAddress}
//               onChange={handleChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Full address of your facility"
//             />
//           </div>
//         </div>

//         {/* Price and Capacity */}
//         <div className="flex gap-x-4">
//           <div className="flex-1">
//             <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700">
//               Price per Hour (₦) *
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <RiMoneyDollarCircleLine className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="pricePerHour"
//                 name="pricePerHour"
//                 type="number"
//                 min="0"
//                 step="100"
//                 required
//                 value={formData.pricePerHour}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="5000"
//               />
//             </div>
//           </div>

//           <div className="flex-1">
//             <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
//               Capacity (People) *
//             </label>
//             <div className="mt-1">
//               <input
//                 id="capacity"
//                 name="capacity"
//                 type="number"
//                 min="1"
//                 required
//                 value={formData.capacity}
//                 onChange={handleChange}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="50"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="facilityDescription" className="block text-sm font-medium text-gray-700">
//             Description (Optional)
//           </label>
//           <div className="mt-1">
//             <textarea
//               id="facilityDescription"
//               name="facilityDescription"
//               rows={4}
//               value={formData.facilityDescription}
//               onChange={handleChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Describe your facility, what sports it's suitable for, etc."
//             />
//           </div>
//         </div>

//         {/* Amenities */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Amenities (Optional)
//           </label>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//             {amenitiesList.map((amenity) => (
//               <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.amenities.includes(amenity)}
//                   onChange={() => handleAmenityChange(amenity)}
//                   className="rounded border-gray-300 text-[#7042D2] focus:ring-[#7042D2]"
//                 />
//                 <span className="text-sm text-gray-700">{amenity}</span>
//               </label>
//             ))}
//           </div>
//           {formData.amenities.length > 0 && (
//             <p className="mt-2 text-xs text-gray-500">
//               Selected: {formData.amenities.length} amenities
//             </p>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-x-4">
//           <button
//             type="button"
//             onClick={handleBack}
//             className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]"
//           >
//             Back
//           </button>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//               isLoading 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]'
//             }`}
//           >
//             {isLoading ? (
//               <div className="flex items-center">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Creating Account...
//               </div>
//             ) : (
//               'Create Account'
//             )}
//           </button>
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className='flex justify-center gap-x-32'>
//         <div>
//           <div className="sm:mx-auto sm:w-full sm:max-w-md w-full">
//             {/* Logo */}
//             <div className="mx-auto flex items-center">
//               <span className="text-white">
//                 <img src={logo} className='w-36 object-cover' alt="GameDey Logo" />
//               </span>
//             </div>

//             {/* Icon */}
//             <div className='bg-yellow-400 w-[75px] h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mt-9'>
//               <div className='bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center border border-black'>
//                 <LuUserRoundPlus />
//               </div>
//             </div>

//             {/* Step Indicator */}
//             <div className="mt-4 flex items-center justify-center space-x-4">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 currentStep === 1 ? 'bg-[#7042D2] text-white' : 'bg-green-500 text-white'
//               }`}>
//                 {currentStep === 1 ? '1' : <RiCheckboxCircleLine className="w-5 h-5" />}
//               </div>
//               <div className="w-12 h-0.5 bg-gray-200"></div>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 currentStep === 2 ? 'bg-[#7042D2] text-white' : 'bg-gray-200 text-gray-600'
//               }`}>
//                 2
//               </div>
//             </div>

//             {/* Dynamic Content */}
//             <form onSubmit={currentStep === 2 ? handleSubmit : (e) => e.preventDefault()}>
//               {currentStep === 1 ? renderStep1() : renderStep2()}
//             </form>
//           </div>

//           <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
//             {/* Success Display */}
//             {success && (
//               <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex items-center">
//                 <RiCheckboxCircleLine className="h-5 w-5 text-green-400 mr-2" />
//                 <span className="text-sm text-green-700">{success}</span>
//               </div>
//             )}

//             {/* Error Display */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-center">
//                 <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2" />
//                 <span className="text-sm text-red-700">{error}</span>
//               </div>
//             )}

//             {/* Login Link */}
//             <p className="mt-6 text-center text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/" className="font-medium text-[#7042D2] hover:text-[#5a2eb8]">
//                 Sign in
//               </Link>
//             </p>

//             {/* Help Text */}
//             <div className="mt-4 text-center text-xs text-gray-500">
//               <p>By creating an account, you agree to our</p>
//               <div className="flex justify-center space-x-4 mt-1">
//                 <Link to="/terms" className="text-[#7042D2] hover:text-[#5a2eb8]">
//                   Terms of Service
//                 </Link>
//                 <span>and</span>
//                 <Link to="/privacy" className="text-[#7042D2] hover:text-[#5a2eb8]">
//                   Privacy Policy
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         <img src={authpic} className='w-[750px] h-[650px] object-cover rounded-3xl hidden md:block' alt="Auth illustration" />
//       </div>
//     </div>
//   );
// };

// export default FacilityRegistration;



// pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningLine,
  RiUser3Line,
  RiPhoneLine,
  RiHomeLine,
  RiMoneyDollarCircleLine,
  RiCheckboxCircleLine
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import authpic from '../assets/authpic.png';
import logo from '../assets/logo.png';
import { LuUserRoundPlus } from "react-icons/lu";

const FacilityRegistration = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Facility Info
    facilityName: '',
    facilityAddress: '',
    facilityDescription: '',
    pricePerHour: '',
    capacity: '',
    amenities: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const amenitiesList = [
    'Parking', 'Restrooms', 'Changing Rooms', 'Water Fountain', 
    'First Aid', 'Equipment Rental', 'WiFi', 'Air Conditioning',
    'Lighting', 'Sound System', 'Security', 'Food & Drinks'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
    setSuccess('');
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.facilityName.trim()) {
      setError('Facility name is required');
      return false;
    }
    if (formData.facilityName.length < 3) {
      setError('Facility name must be at least 3 characters');
      return false;
    }
    if (!formData.facilityAddress.trim()) {
      setError('Facility address is required');
      return false;
    }
    if (!formData.pricePerHour || parseFloat(formData.pricePerHour) <= 0) {
      setError('Valid price per hour is required');
      return false;
    }
    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      setError('Valid capacity is required');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setError('');
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📝 Form submitted!');
    console.log('📋 Current form data:', formData);

    if (!validateStep2()) {
      console.log('❌ Step 2 validation failed');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log('🚀 Calling register function...');
      const result = await register(formData);
      console.log('📄 Register result:', result);

      if (result.success) {
        console.log('✅ Registration successful:', result.data);
        setSuccess('Account created successfully! Redirecting to dashboard...');
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        console.log('❌ Registration failed:', result.message);
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('💥 Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 text-center lg:text-left">
        Create Your Account
      </h2>
      <p className="mt-1 text-sm text-gray-600 font-medium text-center lg:text-left">
        Step 1: Personal Information
      </p>

      <div className="space-y-4 sm:space-y-6 mt-6">
        {/* Name Fields - Mobile Responsive */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiUser3Line className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="First name"
              />
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiUser3Line className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Last name"
              />
            </div>
          </div>
        </div>

        {/* Email Field - Mobile Responsive */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <RiMailLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Phone Field - Mobile Responsive */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number (Optional)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <RiPhoneLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Phone number"
            />
          </div>
        </div>

        {/* Password Fields - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <RiEyeOffLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <RiEyeLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
          </div>

          <div className="flex-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Confirm password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <RiEyeOffLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <RiEyeLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Next Button - Mobile Responsive */}
        <div>
          <button
            type="button"
            onClick={handleNext}
            className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] transition-colors"
          >
            Next: Facility Details
          </button>
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 text-center lg:text-left">
        Facility Information
      </h2>
      <p className="mt-1 text-sm text-gray-600 font-medium text-center lg:text-left">
        Step 2: Tell us about your facility
      </p>

      <div className="space-y-4 sm:space-y-6 mt-6">
        {/* Facility Name - Mobile Responsive */}
        <div>
          <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700">
            Facility Name *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <RiHomeLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              id="facilityName"
              name="facilityName"
              type="text"
              required
              value={formData.facilityName}
              onChange={handleChange}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="e.g., Downtown Sports Center"
            />
          </div>
        </div>

        {/* Facility Address - Mobile Responsive */}
        <div>
          <label htmlFor="facilityAddress" className="block text-sm font-medium text-gray-700">
            Facility Address *
          </label>
          <div className="mt-1">
            <textarea
              id="facilityAddress"
              name="facilityAddress"
              rows={3}
              required
              value={formData.facilityAddress}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Full address of your facility"
            />
          </div>
        </div>

        {/* Price and Capacity - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700">
              Price per Hour (₦) *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiMoneyDollarCircleLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                id="pricePerHour"
                name="pricePerHour"
                type="number"
                min="0"
                step="100"
                required
                value={formData.pricePerHour}
                onChange={handleChange}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="5000"
              />
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacity (People) *
            </label>
            <div className="mt-1">
              <input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                required
                value={formData.capacity}
                onChange={handleChange}
                className="block w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="50"
              />
            </div>
          </div>
        </div>

        {/* Description - Mobile Responsive */}
        <div>
          <label htmlFor="facilityDescription" className="block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <div className="mt-1">
            <textarea
              id="facilityDescription"
              name="facilityDescription"
              rows={4}
              value={formData.facilityDescription}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Describe your facility, what sports it's suitable for, etc."
            />
          </div>
        </div>

        {/* Amenities - Mobile Responsive */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Amenities (Optional)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="rounded border-gray-300 text-[#7042D2] focus:ring-[#7042D2]"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
          {formData.amenities.length > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              Selected: {formData.amenities.length} amenities
            </p>
          )}
        </div>

        {/* Action Buttons - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 flex justify-center py-2.5 sm:py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2] transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-4 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className='flex flex-col xl:flex-row justify-center items-center xl:gap-x-32 gap-y-8 xl:gap-y-0'>
        {/* Left side - Registration Form */}
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="w-full">
            {/* Logo - Mobile Responsive */}
            <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
              <img src={logo} className='w-24 sm:w-32 lg:w-36 object-cover' alt="GameDey Logo" />
            </div>

            {/* Icon - Mobile Responsive */}
            <div className='bg-yellow-400 w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] rounded-full flex justify-center items-center border border-black border-r-4 border-b-4 mt-6 sm:mt-9 mx-auto lg:mx-0'>
              <div className='bg-white w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] rounded-full flex justify-center items-center border border-black'>
                <LuUserRoundPlus className="text-sm sm:text-base" />
              </div>
            </div>

            {/* Step Indicator - Mobile Responsive */}
            <div className="mt-4 flex items-center justify-center space-x-3 sm:space-x-4">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                currentStep === 1 ? 'bg-[#7042D2] text-white' : 'bg-green-500 text-white'
              }`}>
                {currentStep === 1 ? '1' : <RiCheckboxCircleLine className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <div className="w-8 sm:w-12 h-0.5 bg-gray-200"></div>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                currentStep === 2 ? 'bg-[#7042D2] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>

            {/* Dynamic Content */}
            <form onSubmit={currentStep === 2 ? handleSubmit : (e) => e.preventDefault()} className="mt-6">
              {currentStep === 1 ? renderStep1() : renderStep2()}
            </form>
          </div>

          <div className="mt-6 w-full">
            {/* Success Display - Mobile Responsive */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex items-start">
                <RiCheckboxCircleLine className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-700 break-words">{success}</span>
              </div>
            )}

            {/* Error Display - Mobile Responsive */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start">
                <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-700 break-words">{error}</span>
              </div>
            )}

            {/* Login Link - Mobile Responsive */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="font-medium text-[#7042D2] hover:text-[#5a2eb8]">
                Sign in
              </Link>
            </p>

            {/* Help Text - Mobile Responsive */}
            <div className="mt-4 text-center text-xs text-gray-500 px-4 sm:px-0">
              <p>By creating an account, you agree to our</p>
              <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                <Link to="/terms" className="text-[#7042D2] hover:text-[#5a2eb8]">
                  Terms of Service
                </Link>
                <span className="hidden sm:inline">and</span>
                <span className="sm:hidden">and</span>
                <Link to="/privacy" className="text-[#7042D2] hover:text-[#5a2eb8]">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image (Hidden on mobile and tablets) */}
        <div className="hidden xl:block">
          <img 
            src={authpic} 
            className='w-[600px] xl:w-[750px] h-[500px] xl:h-[650px] object-cover rounded-3xl' 
            alt="Auth illustration" 
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityRegistration;