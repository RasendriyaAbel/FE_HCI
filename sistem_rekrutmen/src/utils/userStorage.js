/**
 * Utility untuk menyimpan dan mengelola data user di localStorage
 */

const USERS_KEY = 'registered_users';
const CURRENT_USER_KEY = 'current_user';

/**
 * Mendapatkan semua user yang terdaftar
 */
export const getRegisteredUsers = () => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

/**
 * Menyimpan user baru
 */
export const saveUser = (userData) => {
  if (typeof window === 'undefined') return false;
  try {
    const users = getRegisteredUsers();
    // Cek apakah email sudah terdaftar
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar' };
    }
    
    // Tambahkan user baru
    users.push({
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    });
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Gagal menyimpan data' };
  }
};

/**
 * Validasi login
 */
export const validateLogin = (email, password) => {
  if (typeof window === 'undefined') return { success: false };
  
  const users = getRegisteredUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Simpan current user (tanpa password)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, message: 'Email atau password salah' };
};

/**
 * Mendapatkan current user
 */
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Clear current user
 */
export const clearCurrentUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
};

