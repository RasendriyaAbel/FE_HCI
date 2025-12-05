import { useNavigate } from 'react-router-dom';
import './JobListings.css';

function JobListings({ jobs }) {
  const navigate = useNavigate();

  const handleOpenDetail = (id) => {
    navigate(`/lowongan/${id}`);
  };

  if (jobs.length === 0) {
    return (
      <div className="job-listings">
        <div className="no-jobs-message">
          <p className="no-jobs-text">Tidak ada lowongan yang ditemukan</p>
          <p className="no-jobs-subtext">Coba ubah filter atau kata kunci pencarian Anda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="job-listings">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="job-card"
          onClick={() => handleOpenDetail(job.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenDetail(job.id);
            }
          }}
        >
          <div className="job-card-left">
            <div className="job-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#333"/>
                <rect x="8" y="11" width="8" height="7" rx="1" fill="white"/>
                <path d="M9 11V8C9 6.89543 9.89543 6 11 6H13C14.1046 6 15 6.89543 15 8V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="job-icon-label">{job.title.toUpperCase()}</div>
          </div>
          
          <div className="job-card-center">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-location">{job.type} | {job.location}</p>
            <div className="job-dates">
              <span className="job-upload-date">Diunggah: {job.displayDate || job.uploadDate}</span>
              <span className="job-closing-date">Penutupan: {job.closingDate}</span>
            </div>
          </div>
          
          <div className="job-card-right">
            <button
              type="button"
              className="job-detail-button"
              aria-label="View job details"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetail(job.id);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobListings;

