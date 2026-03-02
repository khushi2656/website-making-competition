import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';
import {
  getStudents,
  searchStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from './services/api';
// Tailwind CSS handles all styling via utility classes

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    setIsSearching(false);
    try {
      const data = await getStudents();
      setStudents(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setIsSearching(true);
    try {
      const data = await searchStudents(query);
      setStudents(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    fetchStudents();
  };

  const handleCreateStudent = async (formData) => {
    setError('');
    try {
      const data = await createStudent(formData);
      setSuccessMessage(data.message);
      fetchStudents();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create student';
      setError(errorMsg);
      throw err;
    }
  };

  const handleUpdateStudent = async (formData) => {
    setError('');
    try {
      const data = await updateStudent(editingStudent._id, formData);
      setSuccessMessage(data.message);
      setEditingStudent(null);
      if (isSearching) {
        fetchStudents();
      } else {
        fetchStudents();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update student';
      setError(errorMsg);
      throw err;
    }
  };

  const handleDeleteStudent = async (id) => {
    setError('');
    try {
      const data = await deleteStudent(id);
      setSuccessMessage(data.message);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student');
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          Student Database Management System
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg font-medium">
            {error}
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg font-medium">
            {successMessage}
          </div>
        )}

        <StudentForm
          onSubmit={editingStudent ? handleUpdateStudent : handleCreateStudent}
          editingStudent={editingStudent}
          onCancel={handleCancelEdit}
        />

        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

        <StudentList
          students={students}
          onEdit={handleEdit}
          onDelete={handleDeleteStudent}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
