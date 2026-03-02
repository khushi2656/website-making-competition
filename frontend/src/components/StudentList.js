import React from 'react';

const StudentList = ({ students, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (students.length === 0) {
    return <div className="no-data">No students found</div>;
  }

  return (
    <div className="student-list">
      <h2>Student List ({students.length})</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Class</th>
              <th>Section</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.studentId}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.phoneNumber}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      if (window.confirm(`Delete ${student.name}?`)) {
                        onDelete(student._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
