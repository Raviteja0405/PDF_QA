from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_service import save_pdf_and_extract_text
from app.models.schema import PDFUploadResponse

router = APIRouter()

@router.post("/upload/", response_model=PDFUploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    doc_id, filename = await save_pdf_and_extract_text(file)
    return PDFUploadResponse(document_id=doc_id, filename=filename)
