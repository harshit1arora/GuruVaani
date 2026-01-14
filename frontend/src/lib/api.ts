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
  // If the endpoint starts with /api (but not /api/v1), use it directly from base URL
  const isDirectApi = endpoint.startsWith('/api') && !endpoint.startsWith('/api/v1');
  const url = isDirectApi 
    ? `${BASE_URL}${endpoint}` 
    : `${BASE_URL}/api/v1${endpoint}`;
  
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
  return apiFetch<Profile>('/profile');
};

export const createProfile = async (profileData: Profile) => {
  return apiFetch<Profile>('/profile', {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
};

export const updateProfile = async (profileData: Profile) => {
  return apiFetch<Profile>('/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

// Planner interfaces
export interface TeachingMethod {
  title: string;
  description: string;
  time: string;
}

export interface PlannerResponse {
  topic: string;
  competencies: string[];
  methods: TeachingMethod[];
  teacher_tip: string;
}

// Video interfaces
export interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  url: string;
}

export interface VideoSuggestionResponse {
  videos: Video[];
  disclaimer: string;
}

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

// Planner endpoints
export const generatePlan = async (grade: string, subject: string, time_available: string) => {
  // Convert time string to minutes (e.g., "30 min" -> 30)
  const minutes = parseInt(time_available.split(' ')[0], 10) || 30;
  
  // Extract number from grade (e.g., "Grade 3" -> 3)
  const gradeMatch = grade.match(/\d+/);
  const gradeNumber = gradeMatch ? parseInt(gradeMatch[0], 10) : 3;
  
  return apiFetch<PlannerResponse>('/api/generate-plan', {
    method: 'POST',
    body: JSON.stringify({
      grade: gradeNumber,
      subject,
      time_available: minutes
    }),
  });
};

// Video suggestion endpoints
export const getVideoSuggestions = async (grade: string, subject: string, topic: string, time_available: string = "30 min") => {
  // Extract number from grade (e.g., "Grade 3" -> 3)
  const gradeMatch = grade.match(/\d+/);
  const gradeNumber = gradeMatch ? parseInt(gradeMatch[0], 10) : 3;

  // Convert time string to minutes (e.g., "30 min" -> 30)
  const minutes = parseInt(time_available.split(' ')[0], 10) || 30;

  return apiFetch<VideoSuggestionResponse>('/api/video-suggestions', {
    method: 'POST',
    body: JSON.stringify({
      grade: gradeNumber,
      subject,
      topic,
      time_available: minutes
    }),
  });
};

export const getClusterVideos = async (clusterName: string, description: string) => {
  return apiFetch<VideoSuggestionResponse>('/resources/cluster-videos', {
    method: 'POST',
    body: JSON.stringify({
      cluster_name: clusterName,
      description
    }),
  });
};

// Coaching interfaces
export interface CoachingCardData {
  title: string;
  text: string;
}

export interface CoachResponse {
  now_fix: CoachingCardData;
  activity: CoachingCardData;
  explain: CoachingCardData;
}

// Coaching endpoints
export const queryCoach = async (classLevel: string, subject: string, problemText: string, language: string = "Hindi/Hinglish") => {
  return apiFetch<CoachResponse>('/coach/query', {
    method: 'POST',
    body: JSON.stringify({
      class_level: classLevel,
      subject,
      problem_text: problemText,
      language
    }),
  });
};