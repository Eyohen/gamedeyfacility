// App.jsx - for facility
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import RegistrationSuccess from './pages/RegistrationSuccess';

import DashboardLayout from './components/dashboard/DashboardLayout';

import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import BookingDetails from './pages/BookingDetails';
import Facility from './pages/Facility';
import CreateFacility from './pages/CreateFacility';
import Community from './pages/Community';
import CreateCommunity from './pages/CreateCommunity';
import CommunityPost from './pages/CommunityPost';
import FinancialOverview from './pages/FinancialOverview';
import ViewBooking from './pages/ViewBooking';






function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          {/* 
            Protected routes with dashboard layout  */}

          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />

          <Route path="/booking-details" element={
            <DashboardLayout>
              <BookingDetails />
            </DashboardLayout>
          } />

          <Route path="/facilities" element={
            <DashboardLayout>
              <Facility />
            </DashboardLayout>
          } />

          <Route path="/create-facility" element={
            <DashboardLayout>
              <CreateFacility />
            </DashboardLayout>
          } />

          <Route path="/bookings" element={
            <DashboardLayout>
              <Bookings />
            </DashboardLayout>
          } />



          <Route path="/booking-details/:bookingId" element={
            <DashboardLayout>
              <ViewBooking />
            </DashboardLayout>
          } />

               <Route path="/community" element={
            <DashboardLayout>
              <Community />
            </DashboardLayout>
          } />

          <Route path="/create-community" element={
            <DashboardLayout>
              <CreateCommunity />
            </DashboardLayout>
          } />

          <Route path="/community-post" element={
            <DashboardLayout>
              <CommunityPost />
            </DashboardLayout>
          } />

          <Route path="/profile" element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          } />


          <Route path="/financial-overview" element={
            <DashboardLayout>
              <FinancialOverview />
            </DashboardLayout>
          } />



          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>

  );
}

export default App;


