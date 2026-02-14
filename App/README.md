# NatrajX Law Firm - Modern Website

A modern, professional law firm website built with Next.js (React) frontend and FastAPI (Python) backend.

## 🌟 Features

### Frontend
- **Modern UI/UX**: Professional design with smooth animations using Framer Motion
- **Aceternity Components**: Beautiful UI components for enhanced user experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Built with Next.js 14 for optimal performance
- **TypeScript**: Type-safe development
- **Professional Aesthetics**: Clean, corporate design suitable for a law firm

### Backend
- **FastAPI**: High-performance Python backend
- **MongoDB Ready**: Easily switch from in-memory to MongoDB
- **RESTful API**: Well-structured API endpoints
- **Pydantic Validation**: Data validation and serialization
- **CORS Enabled**: Ready for frontend integration
- **Sample Data**: Pre-populated with sample data for development

## 📁 Project Structure

```
natrajx-modern/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # Next.js 14 App Router
│   │   │   ├── globals.css  # Global styles
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── page.tsx     # Home page
│   │   ├── components/      # React components
│   │   │   ├── ui/          # Aceternity UI components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── ExpertiseSection.tsx
│   │   └── lib/
│   │       └── utils.ts     # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
└── backend/                  # FastAPI backend
    ├── app/
    │   ├── api/
    │   │   ├── routes/      # API routes
    │   │   │   ├── blogs.py
    │   │   │   ├── team.py
    │   │   │   ├── contact.py
    │   │   │   ├── expertise.py
    │   │   │   └── clients.py
    │   │   └── api.py       # API router aggregator
    │   ├── core/
    │   │   └── config.py    # Configuration
    │   ├── db/
    │   │   └── mongodb.py   # Database connection
    │   ├── schemas/
    │   │   └── schemas.py   # Pydantic models
    │   └── main.py          # FastAPI app
    ├── requirements.txt
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- MongoDB (optional - uses in-memory DB by default)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (optional):
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run the development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

## 🔌 API Endpoints

### Blogs
- `GET /api/v1/blogs` - Get all blogs
- `GET /api/v1/blogs/{id}` - Get blog by ID
- `GET /api/v1/blogs/slug/{slug}` - Get blog by slug
- `POST /api/v1/blogs` - Create new blog
- `PUT /api/v1/blogs/{id}` - Update blog
- `DELETE /api/v1/blogs/{id}` - Delete blog

### Team
- `GET /api/v1/team` - Get all team members
- `GET /api/v1/team/{id}` - Get team member by ID
- `POST /api/v1/team` - Create new team member
- `DELETE /api/v1/team/{id}` - Delete team member

### Expertise
- `GET /api/v1/expertise` - Get all expertise areas
- `GET /api/v1/expertise/{id}` - Get expertise area by ID
- `GET /api/v1/expertise/slug/{slug}` - Get expertise area by slug
- `POST /api/v1/expertise` - Create new expertise area
- `DELETE /api/v1/expertise/{id}` - Delete expertise area

### Clients
- `GET /api/v1/clients` - Get all clients
- `GET /api/v1/clients/{id}` - Get client by ID
- `POST /api/v1/clients` - Create new client
- `DELETE /api/v1/clients/{id}` - Delete client

### Contact
- `POST /api/v1/contact` - Submit contact form
- `GET /api/v1/contact` - Get all submissions (admin)
- `GET /api/v1/contact/{id}` - Get submission by ID (admin)

## 🗄️ Database Configuration

### Using In-Memory Database (Default)

The application uses an in-memory database by default, which is perfect for development and testing. No additional configuration needed!

### Switching to MongoDB

1. Install MongoDB locally or use MongoDB Atlas
2. Update `.env` file:
```env
MONGODB_URL=mongodb://localhost:27017
# or for MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=natrajx_db
```

3. The application will automatically connect to MongoDB on startup

## 🎨 UI Components

The project uses Aceternity-style components for modern animations:

- **TextGenerateEffect**: Animated text reveal
- **MovingBorder**: Animated border effects
- **SparklesCore**: Particle effects
- Custom animations with Framer Motion

## 🔧 Customization

### Changing Theme Colors

Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(0 72% 51%)", // Change this
        // ...
      }
    }
  }
}
```

### Adding New Pages

1. Create a new file in `frontend/src/app/your-page/page.tsx`
2. Add the route to navigation in `frontend/src/components/Navigation.tsx`

### Adding New API Endpoints

1. Create a new route file in `backend/app/api/routes/your_route.py`
2. Add the router to `backend/app/api/api.py`

## 📦 Building for Production

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

## 🔐 Security Notes

- Change the `SECRET_KEY` in `.env` for production
- Implement proper authentication for admin endpoints
- Use HTTPS in production
- Configure CORS properly for production domains
- Validate and sanitize all user inputs

## 📝 Additional Pages to Implement

The following pages are referenced in the navigation but need to be created:

- `/expertise` - Full expertise areas listing
- `/team` - Team members page
- `/clients` - Clients showcase
- `/channel` - YouTube channel/Legal Gazette
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post
- `/internships` - Internship opportunities
- `/contact` - Contact page with form

## 🤝 Contributing

This is a portfolio project. Feel free to use it as a template for your own law firm website.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Aceternity UI for component inspiration
- Tailwind CSS for styling
- FastAPI for the excellent framework
- Next.js for the powerful React framework

---

Built with ❤️ for NatrajX Law Firm
