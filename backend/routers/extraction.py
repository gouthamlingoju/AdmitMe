from fastapi import APIRouter, UploadFile, File, HTTPException
from extractor import extract_entire_student_profile

router = APIRouter()

@router.post("/extract", tags=["AI Extraction"])
async def handle_student_upload(file: UploadFile = File(...)):
    # 1. Check if the file is a PDF
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # 2. Read the bytes from the uploaded PDF
    pdf_bytes = await file.read()
    
    # 3. Run your new master function from extractor.py
    try:
        student_record = await extract_entire_student_profile(pdf_bytes)
        return student_record
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")
        