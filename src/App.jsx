import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientProfile from './pages/ClientProfile';
import ScanEntry from './pages/ScanEntry';
import Transactions from './pages/Transactions';
import StoreProfile from './pages/StoreProfile';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { loadAuthFromStorage } from './store/slices/authSlice';

const App = () => {
  const [isgetStarted, setIsgetStarted] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  const handleSetIsGetStarted = (value) => {
    if (value) {
      dispatch(loadAuthFromStorage());
    }
    setIsgetStarted(value);
  };

  if (isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/:id" element={<ClientProfile />} />
            <Route path="scan-entry" element={<ScanEntry />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="store-profile" element={<StoreProfile />} />
          </Route>
        </Routes>
      </Router>
    );
  }

  return (
    <AuthLayout isgetStarted={isgetStarted} setIsgetStarted={handleSetIsGetStarted}>
      {isSigningUp ? (
        <Signup onToggle={() => setIsSigningUp(false)} setIsLoggedIn={() => {}} />
      ) : (
        <Login onToggle={() => setIsSigningUp(true)} setIsLoggedIn={() => {}} />
      )}
    </AuthLayout>
  );
};

export default App;
