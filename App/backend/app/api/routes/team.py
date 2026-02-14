from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import TeamMember, TeamMemberCreate, MessageResponse
from app.db.mongodb import in_memory_db
import uuid

router = APIRouter()

@router.get("/", response_model=List[TeamMember])
async def get_team_members():
    """Get all team members"""
    team = sorted(in_memory_db.team_members, key=lambda x: x.get("order", 0))
    return team

@router.get("/{member_id}", response_model=TeamMember)
async def get_team_member(member_id: str):
    """Get a single team member by ID"""
    member = next((m for m in in_memory_db.team_members if m["_id"] == member_id), None)
    
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    return member

@router.post("/", response_model=TeamMember)
async def create_team_member(member: TeamMemberCreate):
    """Create a new team member"""
    member_dict = member.model_dump()
    member_dict["_id"] = str(uuid.uuid4())
    member_dict["order"] = len(in_memory_db.team_members)
    
    in_memory_db.team_members.append(member_dict)
    
    return member_dict

@router.delete("/{member_id}", response_model=MessageResponse)
async def delete_team_member(member_id: str):
    """Delete a team member"""
    member = next((m for m in in_memory_db.team_members if m["_id"] == member_id), None)
    
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    in_memory_db.team_members.remove(member)
    
    return MessageResponse(message="Team member deleted successfully")
