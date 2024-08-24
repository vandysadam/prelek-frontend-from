import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import LoginPage from '../src/pages/login';

// import 'react-toastify/dist/ReactToastify.css';
// import RequireAuth from './components/auth/RequireAuth';
// import Analytics from './pages/Analytics';
// import SitePages from './pages/cms/SitePages';
// import ResetPassword from './pages/ResetPassword';
// import Signin from './pages/Signin';
// // import Signup from './pages/Signup';
// // import SigninUser from './pages/SigninUser';

// import { ToastContainer } from 'react-toastify';
// import CompanyRoutes from './pages/company/CompanyRoutes';
// import UserManagementRoutes from './pages/user-management/UserManagementRoutes';
// import DashboardLoader from './pages/utility/DashboardLoader';
// import PageNotFound from './pages/utility/PageNotFound';

// import OrderRoutes from './pages/orders/OrderRoutes';
// import EmployeeRoutes from './pages/employee/EmployeeRoutes';
// import CompanySettingsRoutes from './pages/company-settings/CompanySettingsRoutes';

// const ProductRoutes = React.lazy(
//   () => import('./pages/products/ProductRoutes'),
// );
// const SubscriptionRoutes = React.lazy(
//   () => import('./pages/subscription/SubscriptionRoutes'),
// );
const Dashboard = React.lazy(() => import('./../src/pages/dasboard'));

const AppRouter: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html')!.style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html')!.style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            // <React.Suspense fallback={<DashboardLoader />}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            </React.Suspense>
          }
        />
        {/* User Group  */}
        {/* <Route
          path="/user/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <UserManagementRoutes />
              </RequireAuth>
            </React.Suspense>
          }
        ></Route> */}

        <Route path="/login" element={<LoginPage />}></Route>
        {/*
        <Route path="/admin/signin" element={<SigninUser />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        */}
      </Routes>
    </>
  );
};

export default AppRouter;
