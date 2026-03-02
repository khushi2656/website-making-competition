# Quick Start Guide

## Step-by-Step Installation

### 1. Install Dependencies

**Backend:**
```powershell
cd backend
npm install
```

**Frontend:**
```powershell
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend (.env):**
```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend\.env` and add:
```
MONGO_URI=your_mongodb_atlas_connection_string
REDIS_URL=redis://localhost:6379
PORT=5000
```

**Frontend (.env):**
```powershell
cd frontend
Copy-Item .env.example .env
```

Edit `frontend\.env` (optional):
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Redis

**Windows:**
- Download from: https://github.com/microsoftarchive/redis/releases
- Or use Redis Cloud: https://redis.com/try-free/

### 4. Start the Application

**Backend (Terminal 1):**
```powershell
cd backend
npm start
```

**Frontend (Terminal 2):**
```powershell
cd frontend
npm start
```

### 5. Access the Application

Open your browser and go to: `http://localhost:3000`

## MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a new cluster (Free M0 tier)
4. Click "Connect"
5. Add your IP address to whitelist (or allow from anywhere: 0.0.0.0/0)
6. Create a database user
7. Choose "Connect your application"
8. Copy the connection string
9. Replace `<password>` with your database user password
10. Paste into `backend\.env` as `MONGO_URI`

## Test the Application

1. Add a student
2. View the list
3. Search for students
4. Edit a student
5. Delete a student

## Troubleshooting

- **Port already in use**: Change PORT in backend\.env
- **Can't connect to MongoDB**: Check your connection string and network
- **Redis error**: Make sure Redis server is running
- **CORS error**: Check if backend is running on correct port

---

That's it! You're ready to go! 🚀
