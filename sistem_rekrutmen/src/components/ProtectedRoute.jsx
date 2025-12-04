import { Navigate, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import LoginRequiredModal from './LoginRequiredModal';
import { useState, useEffect } from 'react';

function ProtectedRoute({ children }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) {
      // Tampilkan modal setelah component mount
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loggedIn]);

  const handleCloseModal = () => {
    setShowModal(false);
    // Redirect ke home setelah modal ditutup
    navigate('/', { replace: true });
  };

  if (!loggedIn) {
    return (
      <>
        <LoginRequiredModal 
          isOpen={showModal} 
          onClose={handleCloseModal} 
        />
        <Navigate to="/" replace />
      </>
    );
  }

  return children;
}

export default ProtectedRoute;

