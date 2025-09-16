// // src/components/dashboard/DashboardLayout.jsx
// import React, { useState } from 'react';
// import { 

//   Bell,
//   User,
//   Menu,
//   X,
//   LogOut,
//   Sun,
//   Moon,
//   LayoutDashboard
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';
// import { useDarkMode } from '../../context/DarkModeContext'; // Use our new context
// import logo from '../../assets/logo.png';
// import facilities from '../../assets/facilities.png';
// import bookings from '../../assets/bookings.png';
// import community from '../../assets/community.png';
// import financialoverview from '../../assets/financialoverview.png';
// import getpaid from '../../assets/getpaid.png';
// import reviews from '../../assets/reviews.png';
// import profile from '../../assets/profile.png';






// // MenuItem Component - Modified to handle special case for logout
// const MenuItem = ({ icon, title, path, collapsed, active, onClick }) => {
//   const { darkMode } = useDarkMode();
  
//   // If onClick is provided, use a button instead of a Link
//   if (onClick) {
//     return (
//       <button 
//         onClick={onClick}
//         className={`flex items-center w-full px-4 py-3 text-left rounded-xl ${
//           darkMode 
//             ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
//             : 'text-gray-500 hover:bg-gray-50 hover:text-black'
//         } font-semibold transition-colors`}
//       >
//         <span className="flex-shrink-0">{icon}</span>
//         {!collapsed && <span className="ml-3">{title}</span>}
//       </button>
//     );
//   }
  
//   // Regular menu item with Link
//   return (
//     <Link 
//       to={path}
//       className={`flex items-center w-[200px] px-3 py-3 text-left rounded-xl ${
//         active 
//           ? 'bg-[#7042D2] text-white font-semibold border-r-[6px] border-b-[4px] border-black' 
//           : darkMode
//             ? 'text-gray-300 hover:bg-gray-700 hover:text-white font-semibold border border-black'
//             : 'text-black font-normal hover:bg-gray-50 hover:text-black border-2 border-black'
//       } transition-colors`}
//     >
//       <span className="flex-shrink-0">{icon}</span>
//       {!collapsed && <span className="ml-3">{title}</span>}
//     </Link>
//   );
// };

// const DashboardLayout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const { darkMode, toggleDarkMode } = useDarkMode(); // Use our new context
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const navigate = useNavigate();

//   console.log("layout user", user);

//   // Handle logout function
//   const handleLogout = () => {
//     // Clear access token from localStorage
//     localStorage.removeItem("access_token");
    
//     // Call the logout function from AuthContext
//     logout();
    
//     // Navigate to the home/login page
//     navigate("/");
//   };

//   // Menu items configuration
//   const menuItems = [
//     { path: "/dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
//     { path: "/facilities", title: "Facilities", icon: <img src={facilities} size={25} /> },
//     { path: "/bookings", title: "Bookings", icon: <img src={bookings} size={25} /> },  
//     { path: "/community", title: "Community", icon: <img src={community} size={25} /> },
//     { path: "/financial-overview", title: "Financial Overview", icon: <img src={financialoverview} size={25} /> },
//     { path: "/profile", title: "Profile", icon: <img src={reviews} size={25} /> },

//   ];

//   // Get page title based on current path
//   const getPageTitle = () => {
//     const page = menuItems.find(item => item.path === currentPath);
//     return page ? page.title : "Dashboard";
//   };

//   return (
//     <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : ' text-gray-800'}`}>
//       {/* Sidebar */}
//       <div className={`${collapsed ? 'w-16' : 'w-64'} ${
//         darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100'
//       }  transition-all duration-300 flex flex-col`}>
//         {/* Logo and collapse button */}
//         <div className="flex items-center justify-between p-4">
//           {!collapsed && <div className="text-xl font-bold"><img src={logo} className='w-36' /></div>}
//           <button 
//             onClick={() => setCollapsed(!collapsed)} 
//             className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-black'} p-1 rounded-md`}
//           >
//             {collapsed ? <Menu size={20} /> : <X size={20} />}
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 py-4 px-2 rounded-xl space-y-4">
//           {menuItems.map((item) => (
//             <MenuItem 
//               key={item.path}
//               icon={item.icon} 
//               title={item.title} 
//               path={item.path}
//               collapsed={collapsed} 
//               active={currentPath === item.path}
//             />
//           ))}
          
//           {/* Logout Item - Special handling */}
//           <MenuItem 
//             icon={<LogOut size={20} />} 
//             title="Logout" 
//             collapsed={collapsed}
//             onClick={handleLogout}
//           />
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className='bg-gray-100'>
//         <header className={`${
//           darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white rounded-t-3xl mt-4'
//         } py-4 px-6 flex items-center justify-between`}>
//           <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//             {getPageTitle()}
//           </h1>
//           <div className="flex items-center gap-4">
//             {/* Theme Toggle Button */}
           
            
//             <button className={`p-2 ${
//               darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-black'
//             } rounded-full`}>
//               <Bell size={20} />
//             </button>
            
//             <div className="flex items-center gap-2">
//               <div className={`w-8 h-8 ${
//                 darkMode ? 'bg-gray-700' : 'bg-gray-200'
//               } rounded-full flex items-center justify-center`}>
//                 <User size={16} />
//               </div>
//               <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//                 {user?.firstName} {user?.lastName}
//               </span>
//             </div>
//           </div>
//         </header>
//         </div>

//         {/* Page Content */}
//         <main className={`flex-1 overflow-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;





// src/components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { 
  Bell,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../url';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
import facilities from '../../assets/facilities.png';
import bookings from '../../assets/bookings.png';
import community from '../../assets/community.png';
import financialoverview from '../../assets/financialoverview.png';
import getpaid from '../../assets/getpaid.png';
import reviews from '../../assets/reviews.png';
import profile from '../../assets/profile.png';

// MenuItem Component - Modified for mobile responsiveness
const MenuItem = ({ icon, title, path, collapsed, active, onClick, isMobile }) => {
  
  // If onClick is provided, use a button instead of a Link
  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className="flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 text-left rounded-xl text-gray-500 hover:bg-gray-50 hover:text-black font-semibold transition-colors text-sm sm:text-base"
      >
        <span className="flex-shrink-0">{icon}</span>
        {!collapsed && <span className="ml-2 sm:ml-3">{title}</span>}
      </button>
    );
  }
  
  // Regular menu item with Link
  return (
    <Link 
      to={path}
      className={`flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 text-left rounded-xl ${
        active 
          ? 'bg-[#7042D2] text-white font-semibold border-r-[4px] sm:border-r-[6px] border-b-[2px] sm:border-b-[4px] border-black' 
          : 'text-black font-normal hover:bg-gray-50 hover:text-black border-2 border-black'
      } transition-colors text-sm sm:text-base`}
    >
      <span className="flex-shrink-0 text-lg sm:text-xl">{icon}</span>
      {!collapsed && <span className="ml-2 sm:ml-3 truncate">{title}</span>}
    </Link>
  );
};

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  console.log("layout user", user);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Menu items configuration
  const menuItems = [
    { path: "/dashboard", title: "Dashboard", icon: <LayoutDashboard size={isMobile ? 18 : 20} /> },
    { path: "/facilities", title: "Facilities", icon: <img src={facilities} className="w-4 h-4 sm:w-5 sm:h-5" alt="Facilities" /> },
    { path: "/bookings", title: "Bookings", icon: <img src={bookings} className="w-4 h-4 sm:w-5 sm:h-5" alt="Bookings" /> },  
    { path: "/community", title: "Community", icon: <img src={community} className="w-4 h-4 sm:w-5 sm:h-5" alt="Community" /> },
    { path: "/financial-overview", title: "Financial Overview", icon: <img src={financialoverview} className="w-4 h-4 sm:w-5 sm:h-5" alt="Financial" /> },
    { path: "/profile", title: "Profile", icon: <img src={reviews} className="w-4 h-4 sm:w-5 sm:h-5" alt="Profile" /> },
  ];

  // Get page title based on current path
  const getPageTitle = () => {
    const page = menuItems.find(item => item.path === currentPath);
    return page ? page.title : "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-gray-800">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 h-full z-30 transform transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }` 
          : 'relative'
        }
        ${collapsed && !isMobile ? 'w-16' : 'w-64'} 
        bg-gray-100 border-gray-200
        transition-all duration-300 flex flex-col border-r
      `}>
        {/* Logo and menu button */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          {(!collapsed || isMobile) && (
            <div className="flex items-center">
              <img src={logo} className='w-24 sm:w-32 md:w-36' alt="Logo" />
              
            </div>
          )}
          
          {isMobile ? (
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          ) : (
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="text-gray-500 hover:text-black p-1 rounded-md"
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-2 sm:py-4 px-2 space-y-2 sm:space-y-4 overflow-y-auto">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path}
              icon={item.icon} 
              title={item.title} 
              path={item.path}
              collapsed={collapsed && !isMobile} 
              active={currentPath === item.path}
              isMobile={isMobile}
            />
          ))}
          
          {/* Logout Item */}
          <MenuItem 
            icon={<LogOut size={isMobile ? 18 : 20} />} 
            title="Logout" 
            collapsed={collapsed && !isMobile}
            onClick={handleLogout}
            isMobile={isMobile}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100">
          <header className="bg-white rounded-t-xl sm:rounded-t-3xl mt-2 sm:mt-4 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between shadow-sm">
            
            {/* Mobile Menu Button & Title */}
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="mr-3 p-2 rounded-md text-gray-500 hover:text-gray-700"
                >
                  <Menu size={20} />
                </button>
              )}
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
                {getPageTitle()}
              </h1>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
                <p>Facility</p>
              <button className="p-2 text-gray-500 hover:text-black rounded-full">
                <Bell size={18} className="sm:w-5 sm:h-5" />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={14} className="sm:w-4 sm:h-4" />
                </div>
                {!isMobile && (
                  <span className="text-xs sm:text-sm font-medium text-gray-800 hidden md:inline">
                    {user?.firstName} {user?.lastName}
                  </span>
                )}
              </div>
            </div>
          </header>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-3 sm:p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;