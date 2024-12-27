import axios from 'axios';

// Buat instance axios
export const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL backend Laravel
  headers: {
    'Content-Type': 'application/json', // Default header untuk JSON request
  },
});

// Fungsi login
export const login = async (email, password) => {
  try {
    // Kirim request login ke API
    const response = await api.post('/login', { email, password });

    // Pastikan response status 200
    if (response.status === 200) {
      // Ambil token dari response dan simpan di localStorage
      const { token } = response.data;
      localStorage.setItem('authToken', token);

      // Set Authorization header di instance axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log('Login berhasil:', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Login gagal:', error.response?.data || error.message);
    throw error;
  }
};

// Fungsi logout
export const logout = async () => {
  try {
    // Kirim request logout ke API
    await api.post('/logout');

    // Hapus token dari localStorage dan instance axios
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];

    console.log('Logout berhasil');
  } catch (error) {
    console.error('Logout gagal:', error.response?.data || error.message);
    throw error;
  }
};

// Fungsi untuk mendapatkan data pengguna (contoh authenticated route)
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user'); // Pastikan rute '/user' ada di Laravel
    console.log('Data user berhasil diambil:', response.data);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data user:', error.response?.data || error.message);
    throw error;
  }
};

// Fungsi untuk mengecek token JWT saat halaman direfresh
export const setAuthToken = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Panggil fungsi setAuthToken saat file api.js di-load
setAuthToken();
