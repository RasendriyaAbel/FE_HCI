import { useNavigate } from 'react-router-dom';
import './LoginRequiredModal.css';

function LoginRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="login-modal-backdrop" onClick={handleClose}>
      <div
        className="login-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="login-modal-header">
          <h3 className="login-modal-title">Login Diperlukan</h3>
          <button
            type="button"
            className="login-modal-close"
            onClick={handleClose}
            aria-label="Tutup"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="login-modal-body">
          <div className="login-modal-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1998ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12M12 16H12.01" stroke="#1998ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="login-modal-text">
            Anda harus login terlebih dahulu untuk mengakses semua fitur di website ini.
          </p>
        </div>

        <div className="login-modal-actions">
          <button
            type="button"
            className="login-modal-secondary"
            onClick={handleClose}
          >
            Nanti
          </button>
          <button
            type="button"
            className="login-modal-primary"
            onClick={handleGoToLogin}
          >
            Login Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRequiredModal;

