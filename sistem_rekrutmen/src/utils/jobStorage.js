/**
 * Utility functions untuk mengelola lowongan terakhir yang dilihat user
 */

const LAST_VIEWED_JOB_KEY = 'last_viewed_job';

/**
 * Menyimpan lowongan terakhir yang dilihat
 * @param {object} jobData - Data lowongan (id, title, url)
 */
export const saveLastViewedJob = (jobData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_VIEWED_JOB_KEY, JSON.stringify(jobData));
};

/**
 * Mendapatkan lowongan terakhir yang dilihat
 * @returns {object|null} Data lowongan atau null
 */
export const getLastViewedJob = () => {
  if (typeof window === 'undefined') return null;
  const jobData = localStorage.getItem(LAST_VIEWED_JOB_KEY);
  return jobData ? JSON.parse(jobData) : null;
};

/**
 * Menghapus lowongan terakhir yang dilihat
 */
export const clearLastViewedJob = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LAST_VIEWED_JOB_KEY);
};

