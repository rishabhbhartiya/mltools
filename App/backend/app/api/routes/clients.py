from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import Client, ClientCreate, MessageResponse
from app.db.mongodb import in_memory_db
import uuid

router = APIRouter()

@router.get("/", response_model=List[Client])
async def get_clients(featured_only: bool = False):
    """Get all clients"""
    clients = in_memory_db.clients
    
    if featured_only:
        clients = [c for c in clients if c.get("featured", False)]
    
    return clients

@router.get("/{client_id}", response_model=Client)
async def get_client(client_id: str):
    """Get a single client by ID"""
    client = next((c for c in in_memory_db.clients if c["_id"] == client_id), None)
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    return client

@router.post("/", response_model=Client)
async def create_client(client: ClientCreate):
    """Create a new client"""
    client_dict = client.model_dump()
    client_dict["_id"] = str(uuid.uuid4())
    
    in_memory_db.clients.append(client_dict)
    
    return client_dict

@router.delete("/{client_id}", response_model=MessageResponse)
async def delete_client(client_id: str):
    """Delete a client"""
    client = next((c for c in in_memory_db.clients if c["_id"] == client_id), None)
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    in_memory_db.clients.remove(client)
    
    return MessageResponse(message="Client deleted successfully")
