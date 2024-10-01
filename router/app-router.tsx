import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import LoginPage from '../src/pages/login';
import UserEdit from '../src/pages/users/edit';
import UserTopup from '../src/pages/users/user-topup';
import 'react-toastify/dist/ReactToastify.css'; // Pastikan CSS diimpor

import { ToastContainer } from 'react-toastify';
import DashboardLoaderPage from './../src/pages/dasboard-layout-loader';

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
const UserPage = React.lazy(() => import('../src/pages/users/user-page'));
const UserAdd = React.lazy(() => import('../src/pages/users/user-add'));
const ActivityPage = React.lazy(
  () => import('../src/pages/activities/activity-page'),
);
const ActivityAdd = React.lazy(
  () => import('../src/pages/activities/activity-add'),
);

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
            <React.Suspense fallback={<DashboardLoaderPage />}>
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            </React.Suspense>
          }
        />
        {/* User Group  */}
        <Route
          path="/users/*"
          element={
            <React.Suspense fallback={<DashboardLoaderPage />}>
              <RequireAuth>
                <Routes>
                  <Route path="/list" element={<UserPage />}></Route>
                  <Route path="/add" element={<UserAdd />}></Route>
                  <Route path="/edit/:id" element={<UserEdit />}></Route>
                  <Route path="/topup/:id" element={<UserTopup />}></Route>
                </Routes>
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>

        <Route
          path="/activities/*"
          element={
            <React.Suspense fallback={<DashboardLoaderPage />}>
              <RequireAuth>
                <Routes>
                  <Route path="/list" element={<ActivityPage />}></Route>
                  <Route path="/add" element={<ActivityAdd />}></Route>
                  <Route path="/edit/:id" element={<UserEdit />}></Route>
                </Routes>
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/*
        <Route path="/admin/signin" element={<SigninUser />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        */}
      </Routes>
      {/* <Toaster /> */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AppRouter;
