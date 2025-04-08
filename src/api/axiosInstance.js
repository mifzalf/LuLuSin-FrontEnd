import axios from 'axios';

// Dapatkan base URL dari environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173'; // Updated port to match your application

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Contoh timeout 5 detik
  headers: {
    'Content-Type': 'application/json',
    // Anda bisa menambahkan header lain di sini jika diperlukan
    // Misalnya: 'Authorization': `Bearer ${token}`
  }
});

// Tambahkan interceptor untuk request
axiosInstance.interceptors.request.use(
  config => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Tambahkan interceptor untuk response
axiosInstance.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  error => {
    console.error('Response Error:', {
      message: error.message,
      response: error.response,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export default axiosInstance; 