import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientProfile from './pages/ClientProfile';
import ScanEntry from './pages/ScanEntry';
import Transactions from './pages/Transactions';
import StoreProfile from './pages/StoreProfile';

const App = () => {
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
};

export default App;
