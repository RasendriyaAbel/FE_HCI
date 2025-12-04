/**
 * Utility functions untuk mengelola status lamaran user
 */

const APPLICATION_STATUS_KEY = 'application_status';
const APPLICATION_STEPS = {
  NONE: null,
  KELENGKAPAN_BERKAS: 'kelengkapan-berkas',
  REVIEW: 'review',
  SUBMITTED: 'submitted'
};

/**
 * Mendapatkan status lamaran saat ini
 * @returns {string|null} Status lamaran atau null jika belum ada
 */
export const getApplicationStatus = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(APPLICATION_STATUS_KEY);
};

/**
 * Menyimpan status lamaran
 * @param {string} status - Status lamaran yang akan disimpan
 */
export const setApplicationStatus = (status) => {
  if (typeof window === 'undefined') return;
  if (status) {
    localStorage.setItem(APPLICATION_STATUS_KEY, status);
  } else {
    localStorage.removeItem(APPLICATION_STATUS_KEY);
  }
};

/**
 * Menentukan route yang sesuai berdasarkan status lamaran
 * @returns {string} Route yang sesuai untuk status lamaran
 */
export const getApplicationRoute = () => {
  const status = getApplicationStatus();
  
  switch (status) {
    case APPLICATION_STEPS.KELENGKAPAN_BERKAS:
      return '/lamaran/kelengkapan-berkas';
    case APPLICATION_STEPS.REVIEW:
      return '/lamaran/review';
    case APPLICATION_STEPS.SUBMITTED:
      return '/lamaran/status';
    default:
      // Jika belum ada lamaran, default ke status (atau bisa ke halaman list lamaran)
      return '/lamaran/status';
  }
};

/**
 * Reset status lamaran (untuk testing atau logout)
 */
export const resetApplicationStatus = () => {
  setApplicationStatus(null);
};

export { APPLICATION_STEPS };

