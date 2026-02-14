from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api import api_router
from app.db.mongodb import connect_to_mongo, close_mongo_connection, in_memory_db
from datetime import datetime

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.on_event("startup")
async def startup_db_client():
    """Startup event - connect to database"""
    try:
        await connect_to_mongo()
        # Initialize with sample data
        init_sample_data()
    except Exception as e:
        print(f"Could not connect to MongoDB: {e}")
        print("Using in-memory database for development")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Shutdown event - close database connection"""
    await close_mongo_connection()

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to NatrajX API",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

def init_sample_data():
    """Initialize with sample data for development"""
    
    # Sample blogs
    if not in_memory_db.blogs:
        sample_blogs = [
            {
                "_id": "1",
                "title": "Understanding Corporate Law in India",
                "slug": "understanding-corporate-law-india",
                "content": "Corporate law in India governs the formation, operation, and dissolution of companies...",
                "excerpt": "A comprehensive guide to corporate law in India and its implications for businesses.",
                "author": "NatrajX",
                "category": "Corporate Law",
                "tags": ["corporate", "business", "law"],
                "featured_image": None,
                "published": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
                "views": 150
            },
            {
                "_id": "2",
                "title": "Real Estate Regulations: What You Need to Know",
                "slug": "real-estate-regulations",
                "content": "Real estate regulations in India have evolved significantly with RERA...",
                "excerpt": "Essential information about real estate regulations and compliance requirements.",
                "author": "NatrajX",
                "category": "Real Estate",
                "tags": ["real estate", "RERA", "property"],
                "featured_image": None,
                "published": True,
                "created_at": datetime.now(),
                "updated_at": datetime.now(),
                "views": 203
            }
        ]
        in_memory_db.blogs.extend(sample_blogs)
    
    # Sample team members
    if not in_memory_db.team_members:
        sample_team = [
            {
                "_id": "1",
                "name": "Adv. Ravi Kumar",
                "role": "Senior Partner",
                "designation": "Supreme Court Advocate",
                "bio": "With over 25 years of experience in corporate litigation...",
                "education": ["LL.M Harvard Law School", "LL.B Delhi University"],
                "expertise": ["Corporate Law", "Litigation", "Arbitration"],
                "image": None,
                "email": "ravi@natrajx.com",
                "phone": "+91 99268 56559",
                "linkedin": None,
                "order": 0
            },
            {
                "_id": "2",
                "name": "Adv. Priya Sharma",
                "role": "Partner",
                "designation": "High Court Advocate",
                "bio": "Specialized in real estate and property law with 15 years of experience...",
                "education": ["LL.M London School of Economics", "LL.B Mumbai University"],
                "expertise": ["Real Estate", "Property Law", "Civil Litigation"],
                "image": None,
                "email": "priya@natrajx.com",
                "phone": "+91 98263 75490",
                "linkedin": None,
                "order": 1
            }
        ]
        in_memory_db.team_members.extend(sample_team)
    
    # Sample expertise areas
    if not in_memory_db.expertise_areas:
        sample_expertise = [
            {
                "_id": "1",
                "title": "Corporate Law",
                "slug": "corporate-law",
                "description": "Comprehensive legal services for corporate entities",
                "icon": "building",
                "services": [
                    "Company Formation",
                    "Mergers & Acquisitions",
                    "Corporate Governance",
                    "Compliance"
                ],
                "featured": True
            },
            {
                "_id": "2",
                "title": "Litigation",
                "slug": "litigation",
                "description": "Expert representation in all courts",
                "icon": "scale",
                "services": [
                    "Civil Litigation",
                    "Criminal Defense",
                    "Commercial Disputes",
                    "Arbitration"
                ],
                "featured": True
            }
        ]
        in_memory_db.expertise_areas.extend(sample_expertise)
    
    # Sample clients
    if not in_memory_db.clients:
        sample_clients = [
            {
                "_id": "1",
                "name": "Tech Corp India",
                "logo": None,
                "industry": "Technology",
                "description": "Leading technology company",
                "featured": True
            },
            {
                "_id": "2",
                "name": "Real Estate Builders",
                "logo": None,
                "industry": "Real Estate",
                "description": "Major real estate development company",
                "featured": True
            }
        ]
        in_memory_db.clients.extend(sample_clients)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
