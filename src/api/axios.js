import axios from 'axios';

// Define the global base URL for the API
export const BASE_URL = 'https://backend.realestateshop.co.nz'; // Updated to point to the actual backend

const apiClient = axios.create({
  baseURL: `${BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor for requests (e.g., to add auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    // You can inject tokens here if needed in the future
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses (e.g., to handle global errors like 401)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
