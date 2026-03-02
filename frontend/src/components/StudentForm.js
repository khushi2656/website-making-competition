import React, { useState } from 'react';

const StudentForm = ({ onSubmit, editingStudent, onCancel }) => {
  const [formData, setFormData] = useState({
    name: editingStudent?.name || '',
    studentId: editingStudent?.studentId || '',
    class: editingStudent?.class || '',
    section: editingStudent?.section || '',
    phoneNumber: editingStudent?.phoneNumber || ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.studentId || !formData.class || 
        !formData.section || !formData.phoneNumber) {
      setError('All fields are required');
      return;
    }

    try {
      await onSubmit(formData);
      // Clear form after successful submission
      if (!editingStudent) {
        setFormData({
          name: '',
          studentId: '',
          class: '',
          section: '',
          phoneNumber: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Update Student' : 'Add New Student'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter student ID"
            disabled={editingStudent}
          />
        </div>

        <div className="form-group">
          <label>Class:</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="Enter class"
          />
        </div>

        <div className="form-group">
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="Enter section"
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? 'Update' : 'Add'} Student
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
