import { useState } from 'react';
import './JobSearch.css';

function JobSearch({ onSearch, activeFilters, onRemoveFilter, totalJobs }) {
  const [searchData, setSearchData] = useState({
    keyword: '',
    location: ''
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      keyword: searchData.keyword,
      location: searchData.location,
      activeFilters: activeFilters
    };
    onSearch(filters);
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
            {activeFilters.length > 0 && (
              <div className="filter-buttons">
                {activeFilters.map((filter, index) => (
                  <button 
                    key={index}
                    type="button"
                    className="filter-button"
                    onClick={() => {}}
                  >
                    {filter}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="filters-right">
            <span className="sort-label">TANGGAL PUBLISH</span>
            <button className="sort-button" aria-label="Sort by publish date">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearch;

