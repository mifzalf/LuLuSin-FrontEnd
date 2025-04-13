import axios from 'axios';

// Dapatkan base URL dari environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Sesuaikan dengan port backend Anda

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Timeout 10 detik
  headers: {
    'Content-Type': 'application/json',
  }
});

// Tambahkan interceptor untuk request
axiosInstance.interceptors.request.use(
  config => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('authToken');
    
    // Jika token ada, tambahkan ke header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
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
    
    // Handle unauthorized or token expired
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear all auth related data
      localStorage.clear(); // Clear all localStorage data
      
      // Show notification to user
      const message = error.response.data?.message || 'Sesi Anda telah berakhir. Silakan login kembali.';
      alert(message);
      
      // Redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error('Session expired'));
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 