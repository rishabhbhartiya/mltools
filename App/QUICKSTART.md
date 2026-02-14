# NatrajX Law Firm - Quick Start Guide

## Installation

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

### Backend  
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend API runs at: http://localhost:8000
API Docs at: http://localhost:8000/docs

## Pages Created

✅ Home (/)
✅ Expertise (/expertise) - 20 practice areas
✅ Team (/team)
✅ Clients (/clients)
✅ Blog (/blog)
✅ Blog Post (/blog/[slug])
✅ Contact (/contact)
✅ Legal Gazette (/channel)
✅ Internships (/internships)

## Features

- Modern animated UI with Framer Motion
- Responsive design
- NatrajX branding throughout
- RESTful API backend
- MongoDB ready (uses in-memory by default)

## Next Steps

1. Enhance remaining pages with content
2. Connect frontend to backend API
3. Add real content and images
4. Deploy to production

