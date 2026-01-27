// Base URL for API requests
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hotel-backend-y2u6.onrender.com';

// Helper function to build full API endpoint
export const apiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${path}`;
};
