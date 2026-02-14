from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from app.schemas.schemas import ContactForm, ContactFormCreate, MessageResponse
from app.db.mongodb import in_memory_db
import uuid

router = APIRouter()

@router.post("/", response_model=MessageResponse)
async def submit_contact_form(form: ContactFormCreate):
    """Submit a contact form"""
    form_dict = form.model_dump()
    form_dict["_id"] = str(uuid.uuid4())
    form_dict["submitted_at"] = datetime.now()
    form_dict["status"] = "new"
    
    in_memory_db.contact_submissions.append(form_dict)
    
    # In production, send email notification here
    
    return MessageResponse(
        message="Thank you for contacting us. We will get back to you soon.",
        success=True
    )

@router.get("/", response_model=List[ContactForm])
async def get_contact_submissions():
    """Get all contact form submissions (admin only)"""
    submissions = sorted(
        in_memory_db.contact_submissions,
        key=lambda x: x.get("submitted_at", datetime.now()),
        reverse=True
    )
    return submissions

@router.get("/{submission_id}", response_model=ContactForm)
async def get_contact_submission(submission_id: str):
    """Get a single contact submission (admin only)"""
    submission = next(
        (s for s in in_memory_db.contact_submissions if s["_id"] == submission_id),
        None
    )
    
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    return submission
