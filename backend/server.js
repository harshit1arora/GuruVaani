const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockUsers = [
  {
    id: 1,
    phone_number: '1234567890',
    teacher_id: 'GV-TEACH-2026-000124',
    full_name: 'Rahul Mishra',
    bio: 'Passionate educator with 5+ years of experience',
    expertise: 'Mathematics'
  }
];

// API Routes
app.get('/', (req, res) => {
  res.send('Shiksha Mitra Coach Backend API');
});

// Auth endpoints
app.post('/api/v1/auth/send-otp', (req, res) => {
  const { phone_number } = req.body;
  // In a real app, send OTP to the phone number
  res.json({ status: 'success', message: 'OTP sent successfully' });
});

app.post('/api/v1/auth/verify-otp', (req, res) => {
  const { phone_number, otp } = req.body;
  // In a real app, verify OTP
  // For demo, we'll accept any OTP
  res.json({
    access_token: 'mock-jwt-token-12345',
    token_type: 'bearer'
  });
});

// Profile endpoints
app.get('/api/v1/profile', (req, res) => {
  // Mock profile data
  res.json({
    id: 1,
    teacher_id: 'GV-TEACH-2026-000124',
    full_name: 'Rahul Mishra',
    bio: 'Passionate educator with 5+ years of experience',
    expertise: 'Mathematics'
  });
});

app.post('/api/v1/profile', (req, res) => {
  const profileData = req.body;
  res.json({
    id: 1,
    ...profileData
  });
});

app.put('/api/v1/profile', (req, res) => {
  const profileData = req.body;
  res.json({
    id: 1,
    ...profileData
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});