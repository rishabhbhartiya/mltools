from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import ExpertiseArea, ExpertiseAreaCreate, MessageResponse
from app.db.mongodb import in_memory_db
import uuid

router = APIRouter()

@router.get("/", response_model=List[ExpertiseArea])
async def get_expertise_areas(featured_only: bool = False):
    """Get all expertise areas"""
    areas = in_memory_db.expertise_areas
    
    if featured_only:
        areas = [a for a in areas if a.get("featured", False)]
    
    return areas

@router.get("/{area_id}", response_model=ExpertiseArea)
async def get_expertise_area(area_id: str):
    """Get a single expertise area by ID"""
    area = next((a for a in in_memory_db.expertise_areas if a["_id"] == area_id), None)
    
    if not area:
        raise HTTPException(status_code=404, detail="Expertise area not found")
    
    return area

@router.get("/slug/{slug}", response_model=ExpertiseArea)
async def get_expertise_area_by_slug(slug: str):
    """Get a single expertise area by slug"""
    area = next((a for a in in_memory_db.expertise_areas if a["slug"] == slug), None)
    
    if not area:
        raise HTTPException(status_code=404, detail="Expertise area not found")
    
    return area

@router.post("/", response_model=ExpertiseArea)
async def create_expertise_area(area: ExpertiseAreaCreate):
    """Create a new expertise area"""
    area_dict = area.model_dump()
    area_dict["_id"] = str(uuid.uuid4())
    
    in_memory_db.expertise_areas.append(area_dict)
    
    return area_dict

@router.delete("/{area_id}", response_model=MessageResponse)
async def delete_expertise_area(area_id: str):
    """Delete an expertise area"""
    area = next((a for a in in_memory_db.expertise_areas if a["_id"] == area_id), None)
    
    if not area:
        raise HTTPException(status_code=404, detail="Expertise area not found")
    
    in_memory_db.expertise_areas.remove(area)
    
    return MessageResponse(message="Expertise area deleted successfully")
