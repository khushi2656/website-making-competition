import axios from 'axios';

// In production (served from backend), use relative /api
// In local dev, use the env variable pointing to localhost:5000
const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all students
export const getStudents = async () => {
  const response = await api.get('/students');
  return response.data;
};

// Search students
export const searchStudents = async (query) => {
  const response = await api.get(`/students/search?query=${query}`);
  return response.data;
};

// Create student
export const createStudent = async (studentData) => {
  const response = await api.post('/students', studentData);
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};
