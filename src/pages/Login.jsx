// // pages/Login.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   RiMailLine,
//   RiLockLine,
//   RiEyeLine,
//   RiEyeOffLine,
//   RiErrorWarningLine
// } from 'react-icons/ri';
// import { useAuth } from '../context/AuthContext';
// import authpic from '../assets/authpic.png';
// import logo from '../assets/logo.png';
// import { LuUserRoundPlus } from "react-icons/lu";

// const FacilityLogin = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     setError(''); // Clear error when user types
//   };

//   const validateForm = () => {
//     if (!formData.email.trim()) {
//       setError('Email is required');
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Please enter a valid email address');
//       return false;
//     }

//     if (!formData.password.trim()) {
//       setError('Password is required');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       console.log('🔐 Attempting login...'); // Debug log
      
//       const result = await login(formData.email, formData.password);

//       console.log('📝 Login result:', result); // Debug log

//       if (result.success) {
//         console.log('✅ Login successful, navigating to dashboard...');
        
//         // Store remember me preference
//         if (formData.rememberMe) {
//           localStorage.setItem('remember_me', 'true');
//         } else {
//           localStorage.removeItem('remember_me');
//         }

//         // Navigate to dashboard
//         navigate("/dashboard");
//       } else {
//         console.log('❌ Login failed:', result.message);
//         setError(result.message || 'Invalid email or password');
//       }
//     } catch (err) {
//       console.error('❌ Login error:', err);
//       setError('An unexpected error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Load remembered email on component mount
//   React.useEffect(() => {
//     const rememberedEmail = localStorage.getItem('remembered_email');
//     const rememberMe = localStorage.getItem('remember_me');
    
//     if (rememberMe && rememberedEmail) {
//       setFormData(prev => ({
//         ...prev,
//         email: rememberedEmail,
//         rememberMe: true
//       }));
//     }
//   }, []);

//   // Save email when remember me is checked
//   React.useEffect(() => {
//     if (formData.rememberMe && formData.email) {
//       localStorage.setItem('remembered_email', formData.email);
//     } else {
//       localStorage.removeItem('remembered_email');
//     }
//   }, [formData.rememberMe, formData.email]);

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

//             <h2 className="mt-4 text-3xl font-semibold text-gray-900">
//               Welcome Back
//             </h2>
//             <p className="mt-1 text-sm text-gray-600 font-medium">
//               Sign in to your facility dashboard
//             </p>
//           </div>

//           <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
//             {/* Error Display */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-center">
//                 <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2" />
//                 <span className="text-sm text-red-700">{error}</span>
//               </div>
//             )}

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <RiMailLine className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="block w-[400px] pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7042D2] focus:border-[#7042D2]"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <RiLockLine className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7042D2] focus:border-[#7042D2]"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     ) : (
//                       <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="rememberMe"
//                     name="rememberMe"
//                     type="checkbox"
//                     checked={formData.rememberMe}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-[#7042D2] focus:ring-[#7042D2] border-gray-300 rounded"
//                   />
//                   <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <Link to="/forgot-password" className="font-medium text-[#7042D2] hover:text-[#5a2eb8]">
//                     Forgot your password?
//                   </Link>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                     isLoading 
//                       ? 'bg-gray-400 cursor-not-allowed' 
//                       : 'bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]'
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Signing in...
//                     </div>
//                   ) : (
//                     'Sign in'
//                   )}
//                 </button>
//               </div>

//               {/* Sign Up Link */}
//               <p className="mt-2 text-center text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <Link to="/register" className="font-medium text-[#7042D2] hover:text-[#5a2eb8]">
//                   Create facility account
//                 </Link>
//               </p>
//             </form>

//             {/* Additional Links */}
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="text-center text-sm text-gray-600">
//                 <p className="mb-2">Need help with your account?</p>
//                 <div className="flex justify-center space-x-4">
//                   <Link to="/support" className="text-[#7042D2] hover:text-[#5a2eb8]">
//                     Contact Support
//                   </Link>
//                   <span className="text-gray-300">|</span>
//                   <Link to="/help" className="text-[#7042D2] hover:text-[#5a2eb8]">
//                     Help Center
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <img src={authpic} className='w-[750px] h-[650px] object-cover rounded-3xl hidden md:block' alt="Auth illustration" />
//       </div>
//     </div>
//   );
// };

// export default FacilityLogin;






// pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiErrorWarningLine
} from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import authpic from '../assets/authpic.png';
import logo from '../assets/logo.png';
import { LuUserRoundPlus } from "react-icons/lu";

const FacilityLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('🔐 Attempting login...'); // Debug log
      
      const result = await login(formData.email, formData.password);

      console.log('📝 Login result:', result); // Debug log

      if (result.success) {
        console.log('✅ Login successful, navigating to dashboard...');
        
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remember_me');
        }

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        console.log('❌ Login failed:', result.message);
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    const rememberMe = localStorage.getItem('remember_me');
    
    if (rememberMe && rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  // Save email when remember me is checked
  React.useEffect(() => {
    if (formData.rememberMe && formData.email) {
      localStorage.setItem('remembered_email', formData.email);
    } else {
      localStorage.removeItem('remembered_email');
    }
  }, [formData.rememberMe, formData.email]);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-4 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className='flex flex-col lg:flex-row justify-center items-center lg:gap-x-32 gap-y-8 lg:gap-y-0'>
        {/* Left side - Login Form */}
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

            {/* Title - Mobile Responsive */}
            <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-900 text-center lg:text-left">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-gray-600 font-medium text-center lg:text-left">
              Sign in to your facility dashboard
            </p>
          </div>

          <div className="mt-6 w-full">
            {/* Error Display - Mobile Responsive */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start sm:items-center">
                <RiErrorWarningLine className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-sm text-red-700 break-words">{error}</span>
              </div>
            )}

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Email Field - Mobile Responsive */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
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
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7042D2] focus:border-[#7042D2] text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field - Mobile Responsive */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7042D2] focus:border-[#7042D2] text-sm sm:text-base"
                    placeholder="Enter your password"
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
              </div>

              {/* Remember Me & Forgot Password - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#7042D2] focus:ring-[#7042D2] border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-[#7042D2] hover:text-[#5a2eb8]">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit Button - Mobile Responsive */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white transition-colors ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#7042D2] hover:bg-[#5a2eb8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7042D2]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              {/* Sign Up Link - Mobile Responsive */}
              <p className="text-center text-sm text-gray-600 px-4 sm:px-0">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-[#7042D2] hover:text-[#5a2eb8]">
                  Create facility account
                </Link>
              </p>
            </form>

            {/* Additional Links - Mobile Responsive */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">Need help with your account?</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                  <Link to="/support" className="text-[#7042D2] hover:text-[#5a2eb8]">
                    Contact Support
                  </Link>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <Link to="/help" className="text-[#7042D2] hover:text-[#5a2eb8]">
                    Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image (Hidden on mobile and tablet) */}
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

export default FacilityLogin;