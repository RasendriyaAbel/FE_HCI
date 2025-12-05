import { useState, useRef, useEffect } from 'react';
import './JobSearch.css';

function JobSearch({ 
  onSearch, 
  onFilterChange, 
  onSortChange,
  locationFilter, 
  workplaceFilter, 
  sortBy,
  totalJobs 
}) {
  const [searchData, setSearchData] = useState({
    keyword: '',
    location: ''
  });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showWorkplaceDropdown, setShowWorkplaceDropdown] = useState(false);
  const locationRef = useRef(null);
  const workplaceRef = useRef(null);

  const locations = ['Bali, Indonesia', 'Jakarta, Indonesia', 'Surabaya, Indonesia'];
  const workplaceTypes = ['Onsite', 'Remote', 'Hybrid'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
      if (workplaceRef.current && !workplaceRef.current.contains(event.target)) {
        setShowWorkplaceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      keyword: searchData.keyword,
      location: searchData.location
    });
  };

  const handleLocationSelect = (location) => {
    onFilterChange('locationFilter', location);
    setShowLocationDropdown(false);
  };

  const handleWorkplaceSelect = (type) => {
    onFilterChange('workplaceFilter', type);
    setShowWorkplaceDropdown(false);
  };

  const clearLocationFilter = () => {
    onFilterChange('locationFilter', '');
  };

  const clearWorkplaceFilter = () => {
    onFilterChange('workplaceFilter', '');
  };

  return (
    <div className="job-search">
      <div className="search-section">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-inputs">
            <div className="search-field">
              <label htmlFor="keyword" className="search-label">TEMUKAN PEKERJAAN</label>
              <input
                type="text"
                id="keyword"
                name="keyword"
                className="search-input"
                placeholder="Cari berdasarkan posisi, skill, kata kunci..."
                value={searchData.keyword}
                onChange={handleChange}
              />
            </div>
            
            <div className="search-field">
              <label htmlFor="location" className="search-label">LOKASI</label>
              <input
                type="text"
                id="location"
                name="location"
                className="search-input"
                placeholder="Cari berdasarkan lokasi..."
                value={searchData.location}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>

        <div className="search-filters">
          <div className="filters-left">
            <span className="jobs-count">{totalJobs} POSISI TERSEDIA</span>
            <div className="filter-buttons">
              <div className="filter-dropdown-wrapper" ref={locationRef}>
                <button 
                  type="button"
                  className={`filter-button ${locationFilter ? 'active-filter' : ''}`}
                  onClick={() => {
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowWorkplaceDropdown(false);
                  }}
                >
                  Lokasi
                  {locationFilter && <span className="filter-badge">{locationFilter}</span>}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={showLocationDropdown ? 'rotated' : ''}
                  >
                    <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {showLocationDropdown && (
                  <div className="filter-dropdown">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        className={`dropdown-item ${locationFilter === loc ? 'active' : ''}`}
                        onClick={() => handleLocationSelect(loc)}
                      >
                        {loc}
                      </button>
                    ))}
                    {locationFilter && (
                      <button
                        type="button"
                        className="dropdown-item clear"
                        onClick={clearLocationFilter}
                      >
                        Hapus Filter
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="filter-dropdown-wrapper" ref={workplaceRef}>
                <button 
                  type="button"
                  className={`filter-button ${workplaceFilter ? 'active-filter' : ''}`}
                  onClick={() => {
                    setShowWorkplaceDropdown(!showWorkplaceDropdown);
                    setShowLocationDropdown(false);
                  }}
                >
                  Tempat Bekerja
                  {workplaceFilter && <span className="filter-badge">{workplaceFilter}</span>}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={showWorkplaceDropdown ? 'rotated' : ''}
                  >
                    <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {showWorkplaceDropdown && (
                  <div className="filter-dropdown">
                    {workplaceTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`dropdown-item ${workplaceFilter === type ? 'active' : ''}`}
                        onClick={() => handleWorkplaceSelect(type)}
                      >
                        {type}
                      </button>
                    ))}
                    {workplaceFilter && (
                      <button
                        type="button"
                        className="dropdown-item clear"
                        onClick={clearWorkplaceFilter}
                      >
                        Hapus Filter
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="filters-right">
            <span className="sort-label">TANGGAL PUBLISH</span>
            <button 
              className="sort-button" 
              onClick={onSortChange}
              aria-label="Sort by publish date"
            >
              {sortBy === 'date-desc' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13L12 8L17 13" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10L12 15L17 10" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 13L12 8L17 13" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearch;

