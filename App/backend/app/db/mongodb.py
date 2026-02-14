from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
from app.core.config import settings

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.client[settings.DATABASE_NAME]

async def connect_to_mongo():
    """Connect to MongoDB"""
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)
    print(f"Connected to MongoDB at {settings.MONGODB_URL}")

async def close_mongo_connection():
    """Close MongoDB connection"""
    if db.client:
        db.client.close()
        print("Closed MongoDB connection")

# For local development without MongoDB, use in-memory storage
class InMemoryDB:
    def __init__(self):
        self.blogs = []
        self.team_members = []
        self.clients = []
        self.contact_submissions = []
        self.expertise_areas = []
        
    def reset(self):
        """Reset all collections"""
        self.blogs = []
        self.team_members = []
        self.clients = []
        self.contact_submissions = []
        self.expertise_areas = []

# Global in-memory database instance
in_memory_db = InMemoryDB()
