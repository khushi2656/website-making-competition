import axios from 'axios';

// Use env variable if set, otherwise fall back to deployed Vercel backend
const API_URL = process.env.REACT_APP_API_URL || 'https://website-making-competition.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all students
export const getStudents = async () => {
  const response = await api.get('/api/students');
  return response.data;
};

// Search students
export const searchStudents = async (query) => {
  const response = await api.get(`/api/students/search?query=${query}`);
  return response.data;
};

// Create student
export const createStudent = async (studentData) => {
  const response = await api.post('/api/students', studentData);
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/api/students/${id}`, studentData);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/api/students/${id}`);
  return response.data;
};
