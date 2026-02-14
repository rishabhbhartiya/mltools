from fastapi import APIRouter
from app.api.routes import blogs, team, contact, expertise, clients

api_router = APIRouter()

api_router.include_router(blogs.router, prefix="/blogs", tags=["blogs"])
api_router.include_router(team.router, prefix="/team", tags=["team"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(expertise.router, prefix="/expertise", tags=["expertise"])
api_router.include_router(clients.router, prefix="/clients", tags=["clients"])
