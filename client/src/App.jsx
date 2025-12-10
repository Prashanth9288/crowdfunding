import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import LandingPage from './LandingPage';
import Dashboard from './pages/Dashboard';
import AuthLayout from './pages/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';
import MyCampaigns from './pages/MyCampaigns';
import BackedProjects from './pages/BackedProjects';
import AIAssistant from './components/AIAssistant';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AIAssistant />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/my-campaigns" element={<MyCampaigns />} />
          <Route path="/backed-projects" element={<BackedProjects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
