# Student Database Management System

A complete full-stack web application for managing student records with Redis caching, built with React, Node.js, Express, MongoDB Atlas, and Redis.

## 🎯 Features

- ✅ Add new students
- ✅ View all students
- ✅ Search students by name, ID, class, or section
- ✅ Update student details
- ✅ Delete students
- ✅ Redis caching for optimized performance
- ✅ Clean and responsive UI
- ✅ Error handling
- ✅ No page reload on form submission

## 📁 Complete Folder Structure

```
website-building-competition/
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── redis.js                 # Redis connection
│   ├── controllers/
│   │   └── studentController.js     # Business logic with caching
│   ├── models/
│   │   └── Student.js               # Student schema
│   ├── routes/
│   │   └── studentRoutes.js         # API routes
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                    # Express server
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js       # Add/Edit form component
│   │   │   ├── StudentList.js       # Display students table
│   │   │   └── SearchBar.js         # Search component
│   │   ├── services/
│   │   │   └── api.js               # Axios API calls
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # Styles
│   │   └── index.js                 # Entry point
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- React 18 (Functional Components with Hooks)
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Cloud Database)
- Mongoose ODM
- Redis (Caching)

## 📋 Prerequisites

Before running this application, make sure you have installed:

- Node.js (v14 or higher)
- npm or yarn
- Redis (local or cloud)
- MongoDB Atlas account

## 🚀 Installation & Setup

### 1. Clone or Download the Project

### 2. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or login
3. Create a new cluster
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

### 3. Setup Redis

**Option A: Local Redis (Windows)**
- Download Redis from [Redis Windows](https://github.com/microsoftarchive/redis/releases)
- Install and run Redis server

**Option B: Cloud Redis (Recommended for production)**
- Use [Redis Cloud](https://redis.com/try-free/) or [Upstash](https://upstash.com/)
- Get your Redis connection URL

### 4. Backend Setup

```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env file and add your credentials
notepad .env
```

**Add these values to your .env file:**
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/studentdb?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379
PORT=5000
```

### 5. Frontend Setup

```powershell
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env file (optional, default is http://localhost:5000/api)
notepad .env
```

**Frontend .env file:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Start Backend Server

```powershell
# In the backend folder
cd backend
npm start

# For development with auto-reload
npm run dev
```

Backend will run on: `http://localhost:5000`

### Start Frontend Application

```powershell
# In a new terminal, navigate to frontend folder
cd frontend
npm start
```

Frontend will run on: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students (cached) |
| GET | `/api/students/search?query=xxx` | Search students |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

## 🎨 Student Schema

```javascript
{
  name: String (required),
  studentId: String (required, unique),
  class: String (required),
  section: String (required),
  phoneNumber: String (required),
  timestamps: true
}
```

## ⚡ Redis Caching Strategy

1. **GET /api/students**: 
   - First checks Redis cache (key: `students:all`)
   - If found, returns cached data
   - If not found, fetches from MongoDB and stores in Redis with 300s expiry

2. **POST/PUT/DELETE operations**:
   - Automatically deletes cache key `students:all`
   - Forces fresh data fetch on next GET request

3. **Cache Expiry**: 300 seconds (5 minutes)

## 🧪 Testing the Application

1. **Add Student**: Fill the form and click "Add Student"
2. **View Students**: All students are displayed in a table
3. **Search**: Type in the search bar and click "Search"
4. **Edit**: Click "Edit" button on any student
5. **Delete**: Click "Delete" button and confirm

## 🔒 Error Handling

- ✅ Backend: Try-catch blocks with proper HTTP status codes
- ✅ Frontend: Error messages displayed to users
- ✅ Validation: All required fields validated
- ✅ Unique constraint: Student ID must be unique

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Ensure Redis is running
- Check if port 5000 is available

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in frontend .env file
- Check for CORS issues in browser console

### Redis connection error
- Make sure Redis server is running
- Verify REDIS_URL in backend .env file
- If using cloud Redis, check your connection credentials

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "redis": "^4.6.5",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5"
}
```

### Frontend
```json
{
  "axios": "^1.3.4",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1"
}
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/docs/)
- [Axios Documentation](https://axios-http.com/)

## 📝 Notes

- This is a complete working application ready for deployment
- MongoDB Atlas provides 512MB free tier
- Redis Cloud offers free tier for small applications
- All CRUD operations are fully functional
- Caching significantly improves performance

## 🚀 Deployment Tips

1. **Backend**: Deploy to Heroku, Render, or Railway
2. **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
3. **Database**: Already on MongoDB Atlas (cloud)
4. **Redis**: Use Redis Cloud or Upstash for production

## 👨‍💻 Author

Built for Website Building Competition

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Coding! 🎉**
