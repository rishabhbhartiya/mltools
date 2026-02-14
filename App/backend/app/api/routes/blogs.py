from fastapi import APIRouter, HTTPException, Query
from typing import List
from datetime import datetime
from app.schemas.schemas import Blog, BlogCreate, BlogUpdate, MessageResponse
from app.db.mongodb import in_memory_db
import uuid

router = APIRouter()

@router.get("/", response_model=List[Blog])
async def get_blogs(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: str = None,
    tag: str = None,
    search: str = None
):
    """Get all blogs with optional filtering"""
    blogs = in_memory_db.blogs
    
    # Filter by category
    if category:
        blogs = [b for b in blogs if b.get("category") == category]
    
    # Filter by tag
    if tag:
        blogs = [b for b in blogs if tag in b.get("tags", [])]
    
    # Search in title and content
    if search:
        blogs = [b for b in blogs if search.lower() in b.get("title", "").lower() 
                 or search.lower() in b.get("content", "").lower()]
    
    # Filter published only
    blogs = [b for b in blogs if b.get("published", True)]
    
    # Sort by date
    blogs = sorted(blogs, key=lambda x: x.get("created_at", datetime.now()), reverse=True)
    
    return blogs[skip:skip + limit]

@router.get("/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    """Get a single blog by ID"""
    blog = next((b for b in in_memory_db.blogs if b["_id"] == blog_id), None)
    
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Increment views
    blog["views"] = blog.get("views", 0) + 1
    
    return blog

@router.get("/slug/{slug}", response_model=Blog)
async def get_blog_by_slug(slug: str):
    """Get a single blog by slug"""
    blog = next((b for b in in_memory_db.blogs if b["slug"] == slug), None)
    
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # Increment views
    blog["views"] = blog.get("views", 0) + 1
    
    return blog

@router.post("/", response_model=Blog)
async def create_blog(blog: BlogCreate):
    """Create a new blog post"""
    blog_dict = blog.model_dump()
    blog_dict["_id"] = str(uuid.uuid4())
    blog_dict["created_at"] = datetime.now()
    blog_dict["updated_at"] = datetime.now()
    blog_dict["views"] = 0
    
    in_memory_db.blogs.append(blog_dict)
    
    return blog_dict

@router.put("/{blog_id}", response_model=Blog)
async def update_blog(blog_id: str, blog_update: BlogUpdate):
    """Update a blog post"""
    blog = next((b for b in in_memory_db.blogs if b["_id"] == blog_id), None)
    
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    update_data = blog_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.now()
    
    blog.update(update_data)
    
    return blog

@router.delete("/{blog_id}", response_model=MessageResponse)
async def delete_blog(blog_id: str):
    """Delete a blog post"""
    blog = next((b for b in in_memory_db.blogs if b["_id"] == blog_id), None)
    
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    in_memory_db.blogs.remove(blog)
    
    return MessageResponse(message="Blog deleted successfully")
