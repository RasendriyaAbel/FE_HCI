import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExploreJobsPage from './pages/ExploreJobsPage';
import DetailLowonganPage from './pages/DetailLowonganPage';
import ProfilePage from './pages/ProfilePage';
import KelengkapanBerkasPage from './pages/KelengkapanBerkasPage';
import ReviewLamaranPage from './pages/ReviewLamaranPage';
import StatusLamaranPage from './pages/StatusLamaranPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/lowongan" 
        element={
          <ProtectedRoute>
            <ExploreJobsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/lowongan/:id" 
        element={
          <ProtectedRoute>
            <DetailLowonganPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/lamaran/kelengkapan-berkas" 
        element={
          <ProtectedRoute>
            <KelengkapanBerkasPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/lamaran/review" 
        element={
          <ProtectedRoute>
            <ReviewLamaranPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/lamaran/status" 
        element={
          <ProtectedRoute>
            <StatusLamaranPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/tentang-kami" element={<AboutPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
