/**
 * Utility functions untuk mengelola status autentikasi user
 */

const AUTH_KEY = 'is_logged_in';
const USER_KEY = 'user_data';

/**
 * Mengecek apakah user sudah login
 * @returns {boolean} True jika user sudah login
 */
export const isLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === 'true';
};

/**
 * Set status login user
 * @param {boolean} status - Status login
 * @param {object} userData - Data user (optional)
 */
export const setLoginStatus = (status, userData = null) => {
  if (typeof window === 'undefined') return;
  if (status) {
    localStorage.setItem(AUTH_KEY, 'true');
    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
  } else {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    // Clear current user dari userStorage juga
    const { clearCurrentUser } = require('./userStorage');
    clearCurrentUser();
  }
};

/**
 * Mendapatkan data user yang tersimpan
 * @returns {object|null} Data user atau null
 */
export const getUserData = () => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Logout user
 */
export const logout = () => {
  setLoginStatus(false);
};

