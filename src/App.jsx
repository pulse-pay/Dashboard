import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientProfile from './pages/ClientProfile';
import ScanEntry from './pages/ScanEntry';
import Transactions from './pages/Transactions';
import StoreProfile from './pages/StoreProfile';
import { useState } from 'react';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';

const App = () => {
  const [isgetStarted, setIsgetStarted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSetIsGetStarted = (value) => {
    if (value) {
      const auth = window.localStorage.getItem('auth');
      if (auth) {
        setIsLoggedIn(true);
      }
    }
    setIsgetStarted(value);
  };

  if (isLoggedIn) {
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
        <Signup onToggle={() => setIsSigningUp(false)} />
      ) : (
        <Login onToggle={() => setIsSigningUp(true)} setIsLoggedIn={setIsLoggedIn} />
      )}
    </AuthLayout>
  );
};

export default App;
