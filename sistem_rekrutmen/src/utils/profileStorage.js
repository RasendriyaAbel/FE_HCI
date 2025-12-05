/**
 * Utility functions untuk mengelola data profile user
 */

const PROFILE_DATA_KEY = 'user_profile_data';

/**
 * Menyimpan data profile user
 * @param {object} profileData - Data profile yang akan disimpan
 */
export const saveProfileData = (profileData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profileData));
};

/**
 * Mendapatkan data profile user
 * @returns {object|null} Data profile atau null jika belum ada
 */
export const getProfileData = () => {
  if (typeof window === 'undefined') return null;
  const profileData = localStorage.getItem(PROFILE_DATA_KEY);
  return profileData ? JSON.parse(profileData) : null;
};

/**
 * Menghapus data profile user
 */
export const clearProfileData = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_DATA_KEY);
};

/**
 * Mengecek apakah profile sudah lengkap
 * @returns {boolean} True jika profile sudah lengkap
 */
export const isProfileComplete = () => {
  const profileData = getProfileData();
  if (!profileData) return false;

  // Cek data pribadi minimal
  const personalData = profileData.personalData || {};
  const requiredPersonalFields = [
    'namaLengkap',
    'email',
    'tanggalLahir',
    'jenisKelamin',
    'alamatTinggal'
  ];

  const hasAllPersonalFields = requiredPersonalFields.every(
    field => personalData[field] && personalData[field].trim() !== ''
  );

  // Cek dokumen minimal (minimal 3 dokumen harus diupload)
  const documents = profileData.documents || {};
  const uploadedDocuments = Object.values(documents).filter(
    doc => doc && doc.fileName && doc.fileName.trim() !== ''
  );

  return hasAllPersonalFields && uploadedDocuments.length >= 3;
};

/**
 * Mendapatkan data pribadi saja
 * @returns {object|null} Data pribadi atau null
 */
export const getPersonalData = () => {
  const profileData = getProfileData();
  return profileData ? profileData.personalData || null : null;
};

/**
 * Mendapatkan data dokumen saja
 * @returns {object|null} Data dokumen atau null
 */
export const getDocumentsData = () => {
  const profileData = getProfileData();
  return profileData ? profileData.documents || null : null;
};

