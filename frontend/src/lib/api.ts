// API base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Request headers with auth token
const getHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic fetch wrapper for API calls
const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${BASE_URL}/api/v1${endpoint}`;
  
  const response = await fetch(url, {
    headers: getHeaders(),
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: 'An unexpected error occurred',
    }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  
  return response.json() as Promise<T>;
};

// Auth endpoints
export const sendOtp = async (phone_number: string) => {
  return apiFetch<{ status: string; message: string }>('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phone_number }),
  });
};

export const verifyOtp = async (phone_number: string, otp: string) => {
  return apiFetch<{ access_token: string; token_type: string }>('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone_number, otp }),
  });
};

// Profile endpoints
export const getProfile = async () => {
  return apiFetch<any>('/profile');
};

export const createProfile = async (profileData: any) => {
  return apiFetch<any>('/profile', {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
};

export const updateProfile = async (profileData: any) => {
  return apiFetch<any>('/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

// Common interfaces for API responses
export interface ApiResponse {
  status: string;
  message: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface Profile {
  id: number;
  teacher_id: number;
  full_name: string;
  bio?: string;
  expertise?: string;
}