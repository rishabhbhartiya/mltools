from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# Blog Models
class BlogBase(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    author: str
    category: str
    tags: List[str] = []
    featured_image: Optional[str] = None
    published: bool = True

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    featured_image: Optional[str] = None
    published: Optional[bool] = None

class Blog(BlogBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime
    views: int = 0
    
    class Config:
        populate_by_name = True

# Team Member Models
class TeamMemberBase(BaseModel):
    name: str
    role: str
    designation: str
    bio: str
    education: List[str] = []
    expertise: List[str] = []
    image: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMember(TeamMemberBase):
    id: str = Field(alias="_id")
    order: int = 0
    
    class Config:
        populate_by_name = True

# Client Models
class ClientBase(BaseModel):
    name: str
    logo: Optional[str] = None
    industry: str
    description: Optional[str] = None
    featured: bool = False

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: str = Field(alias="_id")
    
    class Config:
        populate_by_name = True

# Contact Form Models
class ContactFormBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
    case_files: Optional[List[str]] = None

class ContactFormCreate(ContactFormBase):
    pass

class ContactForm(ContactFormBase):
    id: str = Field(alias="_id")
    submitted_at: datetime
    status: str = "new"  # new, in_progress, resolved
    
    class Config:
        populate_by_name = True

# Expertise Area Models
class ExpertiseAreaBase(BaseModel):
    title: str
    slug: str
    description: str
    icon: str
    services: List[str] = []
    featured: bool = False

class ExpertiseAreaCreate(ExpertiseAreaBase):
    pass

class ExpertiseArea(ExpertiseAreaBase):
    id: str = Field(alias="_id")
    
    class Config:
        populate_by_name = True

# Response Models
class MessageResponse(BaseModel):
    message: str
    success: bool = True
