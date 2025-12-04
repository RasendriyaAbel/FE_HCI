import { useState } from 'react';
import Header from '../components/explore/Header';
import JobSearch from '../components/explore/JobSearch';
import JobListings from '../components/explore/JobListings';
import Footer from '../components/landing/Footer';
import './ExploreJobsPage.css';

function ExploreJobsPage() {
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    location: '',
    activeFilters: ['Lokasi', 'Tempat Bekerja']
  });

  const [jobs] = useState([
    {
      id: 1,
      title: 'Security Engineer',
      type: 'Onsite',
      location: 'Bali, Indonesia',
      uploadDate: '10 November 2025',
      closingDate: '17 November 2025'
    },
    {
      id: 2,
      title: 'Security Engineer',
      type: 'Onsite',
      location: 'Bali, Indonesia',
      uploadDate: '10 November 2025',
      closingDate: '17 November 2025'
    },
    {
      id: 3,
      title: 'Security Engineer',
      type: 'Onsite',
      location: 'Bali, Indonesia',
      uploadDate: '10 November 2025',
      closingDate: '17 November 2025'
    },
    {
      id: 4,
      title: 'Security Engineer',
      type: 'Onsite',
      location: 'Bali, Indonesia',
      uploadDate: '10 November 2025',
      closingDate: '17 November 2025'
    },
    {
      id: 5,
      title: 'Security Engineer',
      type: 'Onsite',
      location: 'Bali, Indonesia',
      uploadDate: '10 November 2025',
      closingDate: '17 November 2025'
    }
  ]);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleRemoveFilter = (filterToRemove) => {
    setSearchFilters(prev => ({
      ...prev,
      activeFilters: prev.activeFilters.filter(f => f !== filterToRemove)
    }));
  };

  return (
    <div className="explore-jobs-page">
      <Header />
      <div className="explore-jobs-content">
        <div className="jobs-container">
          <h1 className="jobs-title">Lowongan Kami</h1>
          
          <JobSearch 
            onSearch={handleSearch}
            activeFilters={searchFilters.activeFilters}
            onRemoveFilter={handleRemoveFilter}
            totalJobs={jobs.length}
          />
          
          <JobListings jobs={jobs} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreJobsPage;

