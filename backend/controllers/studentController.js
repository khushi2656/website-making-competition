const Student = require('../models/Student');
const { getRedisClient } = require('../config/redisClient');

const CACHE_KEY = 'students:all';
const CACHE_EXPIRY = 300; // 300 seconds

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getStudents = async (req, res) => {
  try {
    const redisClient = getRedisClient();
    
    // Check Redis cache first
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(CACHE_KEY);
        if (cachedData) {
          console.log('Returning cached data');
          return res.status(200).json({
            success: true,
            data: JSON.parse(cachedData),
            source: 'cache'
          });
        }
      } catch (redisError) {
        console.error('Redis get error:', redisError);
      }
    }

    // If not in cache, fetch from MongoDB
    const students = await Student.find({}).sort({ createdAt: -1 });
    
    // Store in Redis cache
    if (redisClient) {
      try {
        await redisClient.setEx(CACHE_KEY, CACHE_EXPIRY, JSON.stringify(students));
        console.log('Data cached successfully');
      } catch (redisError) {
        console.error('Redis set error:', redisError);
      }
    }

    res.status(200).json({
      success: true,
      data: students,
      source: 'database'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Search students
// @route   GET /api/students/search
// @access  Public
const searchStudents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { studentId: { $regex: query, $options: 'i' } },
        { class: { $regex: query, $options: 'i' } },
        { section: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res) => {
  try {
    const { name, studentId, class: studentClass, section, phoneNumber } = req.body;

    // Validation
    if (!name || !studentId || !studentClass || !section || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if student ID already exists
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student ID already exists'
      });
    }

    const student = await Student.create({
      name,
      studentId,
      class: studentClass,
      section,
      phoneNumber
    });

    // Delete cache after creating new student
    const redisClient = getRedisClient();
    if (redisClient) {
      try {
        await redisClient.del(CACHE_KEY);
        console.log('Cache cleared after creating student');
      } catch (redisError) {
        console.error('Redis delete error:', redisError);
      }
    }

    res.status(201).json({
      success: true,
      data: student,
      message: 'Student created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { name, studentId, class: studentClass, section, phoneNumber } = req.body;

    // Check if updating studentId and if it already exists
    if (studentId && studentId !== student.studentId) {
      const existingStudent = await Student.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Student ID already exists'
        });
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: name || student.name,
        studentId: studentId || student.studentId,
        class: studentClass || student.class,
        section: section || student.section,
        phoneNumber: phoneNumber || student.phoneNumber
      },
      { new: true, runValidators: true }
    );

    // Delete cache after updating student
    const redisClient = getRedisClient();
    if (redisClient) {
      try {
        await redisClient.del(CACHE_KEY);
        console.log('Cache cleared after updating student');
      } catch (redisError) {
        console.error('Redis delete error:', redisError);
      }
    }

    res.status(200).json({
      success: true,
      data: updatedStudent,
      message: 'Student updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    // Delete cache after deleting student
    const redisClient = getRedisClient();
    if (redisClient) {
      try {
        await redisClient.del(CACHE_KEY);
        console.log('Cache cleared after deleting student');
      } catch (redisError) {
        console.error('Redis delete error:', redisError);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getStudents,
  searchStudents,
  createStudent,
  updateStudent,
  deleteStudent
};
