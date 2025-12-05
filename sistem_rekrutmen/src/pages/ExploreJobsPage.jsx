import { useState, useMemo } from 'react';
import Header from '../components/explore/Header';
import JobSearch from '../components/explore/JobSearch';
import JobListings from '../components/explore/JobListings';
import Footer from '../components/landing/Footer';
import { getAllJobs } from '../data/jobsData';
import './ExploreJobsPage.css';

function ExploreJobsPage() {
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    location: '',
    locationFilter: '',
    workplaceFilter: '',
    sortBy: 'date-desc' // date-asc, date-desc
  });

  const allJobs = getAllJobs().map(job => ({
    id: job.id,
    title: job.title,
    type: job.type,
    location: job.location,
    uploadDate: job.uploadDate,
    displayDate: job.displayDate,
    closingDate: job.closingDate
  }));

  // Filter dan sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = [...allJobs];

    // Filter by keyword
    if (searchFilters.keyword) {
      const keyword = searchFilters.keyword.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword)
      );
    }

    // Filter by location search
    if (searchFilters.location) {
      const location = searchFilters.location.toLowerCase();
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }

    // Filter by location dropdown
    if (searchFilters.locationFilter) {
      filtered = filtered.filter(job => 
        job.location === searchFilters.locationFilter
      );
    }

    // Filter by workplace type
    if (searchFilters.workplaceFilter) {
      filtered = filtered.filter(job => 
        job.type === searchFilters.workplaceFilter
      );
    }

    // Sort by date
    if (searchFilters.sortBy === 'date-asc') {
      filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    } else if (searchFilters.sortBy === 'date-desc') {
      filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }

    return filtered;
  }, [searchFilters, allJobs]);

  const handleSearch = (filters) => {
    setSearchFilters(prev => ({
      ...prev,
      keyword: filters.keyword || prev.keyword,
      location: filters.location || prev.location
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = () => {
    setSearchFilters(prev => ({
      ...prev,
      sortBy: prev.sortBy === 'date-desc' ? 'date-asc' : 'date-desc'
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
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            locationFilter={searchFilters.locationFilter}
            workplaceFilter={searchFilters.workplaceFilter}
            sortBy={searchFilters.sortBy}
            totalJobs={filteredJobs.length}
          />
          
          <JobListings jobs={filteredJobs} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreJobsPage;

