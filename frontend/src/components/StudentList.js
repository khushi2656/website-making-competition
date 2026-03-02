import React from 'react';

const StudentList = ({ students, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center text-indigo-500 font-medium">
        Loading students...
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-400 font-medium">
        No students found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Student List <span className="text-indigo-500">({students.length})</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Student ID</th>
              <th className="px-4 py-3 text-left font-semibold">Class</th>
              <th className="px-4 py-3 text-left font-semibold">Section</th>
              <th className="px-4 py-3 text-left font-semibold">Phone Number</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className={`border-b border-gray-100 hover:bg-indigo-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-3 text-gray-800 font-medium">{student.name}</td>
                <td className="px-4 py-3 text-gray-600">{student.studentId}</td>
                <td className="px-4 py-3 text-gray-600">{student.class}</td>
                <td className="px-4 py-3 text-gray-600">{student.section}</td>
                <td className="px-4 py-3 text-gray-600">{student.phoneNumber}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onEdit(student)}
                    className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${student.name}?`)) {
                        onDelete(student._id);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
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
