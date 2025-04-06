import axios from 'axios';

// Dapatkan base URL dari environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Fallback jika env var tidak ada

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Contoh timeout 5 detik
  headers: {
    'Content-Type': 'application/json',
    // Anda bisa menambahkan header lain di sini jika diperlukan
    // Misalnya: 'Authorization': `Bearer ${token}`
  }
});

// Opsional: Tambahkan interceptor untuk request atau response
// axiosInstance.interceptors.request.use(config => {
//   // Lakukan sesuatu sebelum request dikirim
//   console.log('Starting Request', config);
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(response => {
//   // Lakukan sesuatu dengan data response
//   console.log('Response:', response);
//   return response;
// }, error => {
//   // Lakukan sesuatu dengan error response
//   console.error('Response Error:', error);
//   return Promise.reject(error);
// });

export default axiosInstance; 