# Installation Guide - NatrajX Law Firm Website

## Quick Start (Recommended)

The easiest way to get started is using the provided start script:

```bash
chmod +x start.sh
./start.sh
```

This will automatically:
- Set up the backend with a Python virtual environment
- Install all dependencies
- Start both frontend and backend servers
- Open the application at http://localhost:3000

## Manual Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **npm** (comes with Node.js)
- **MongoDB** (optional - uses in-memory DB by default) - [Download](https://www.mongodb.com/try/download/community)

### Step-by-Step Installation

#### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create and activate a Python virtual environment:

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Create environment file (optional):
```bash
cp .env.example .env
```

Edit `.env` file if you want to use MongoDB or customize settings:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=natrajx_db
```

Start the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at:
- API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

#### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install Node.js dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at:
- Website: http://localhost:3000

## Using Docker (Alternative Method)

If you prefer using Docker, you can run the entire stack with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 8000
- Frontend on port 3000

To stop:
```bash
docker-compose down
```

## Database Setup

### Option 1: In-Memory Database (Default)

No setup required! The application uses an in-memory database by default, which is perfect for:
- Development and testing
- Quick demos
- Learning the codebase

**Note:** Data is lost when the server restarts.

### Option 2: MongoDB (Production)

#### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux (systemd)
   sudo systemctl start mongod
   
   # Windows
   # MongoDB runs as a Windows service automatically
   ```

3. Update backend `.env`:
   ```env
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=natrajx_db
   ```

#### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update backend `.env`:
   ```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
   DATABASE_NAME=natrajx_db
   ```

## Verification

After installation, verify everything is working:

1. **Backend Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```
   Should return: `{"status":"healthy","timestamp":"..."}`

2. **API Documentation:**
   Open http://localhost:8000/docs in your browser

3. **Frontend:**
   Open http://localhost:3000 in your browser

## Common Issues and Solutions

### Port Already in Use

If ports 3000 or 8000 are already in use:

**Backend:**
```bash
uvicorn app.main:app --reload --port 8001
```

**Frontend:**
Update `package.json`:
```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

### Python Module Not Found

Make sure your virtual environment is activated:
```bash
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

### Node Module Errors

Try removing and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Error

1. Ensure MongoDB is running
2. Check the connection string in `.env`
3. If using Atlas, ensure IP is whitelisted

## Development Workflow

1. Start backend: `uvicorn app.main:app --reload`
2. Start frontend: `npm run dev`
3. Make changes to code
4. Both servers will auto-reload on changes

## Building for Production

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Backend
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Next Steps

After installation:

1. Explore the codebase
2. Check out the API documentation at http://localhost:8000/docs
3. Customize the theme colors in `frontend/tailwind.config.js`
4. Add your own content and images
5. Implement additional pages as needed

## Support

For issues or questions:
- Check the main README.md
- Review the API documentation
- Check backend logs for errors
- Check browser console for frontend errors

## Environment Variables Reference

### Backend (.env)

```env
# Required
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=natrajx_db

# Optional
SECRET_KEY=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
```

### Frontend

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

Happy coding! 🚀
