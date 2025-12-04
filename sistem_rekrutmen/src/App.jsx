import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExploreJobsPage from './pages/ExploreJobsPage';
import DetailLowonganPage from './pages/DetailLowonganPage';
import ProfilePage from './pages/ProfilePage';
import KelengkapanBerkasPage from './pages/KelengkapanBerkasPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lowongan" element={<ExploreJobsPage />} />
      <Route path="/lowongan/:id" element={<DetailLowonganPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/lamaran/kelengkapan-berkas" element={<KelengkapanBerkasPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
