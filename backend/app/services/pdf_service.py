import os
import uuid
from PyPDF2 import PdfReader
from fastapi import UploadFile
from app.utils.file_utils import save_file

BASE_DIR = "data"
TEXT_DIR = os.path.join(BASE_DIR, "texts")
PDF_DIR = os.path.join(BASE_DIR, "pdfs")

os.makedirs(TEXT_DIR, exist_ok=True)
os.makedirs(PDF_DIR, exist_ok=True)

async def save_pdf_and_extract_text(file: UploadFile):
    doc_id = str(uuid.uuid4())
    pdf_path = os.path.join(PDF_DIR, f"{doc_id}.pdf")
    await save_file(file, pdf_path)

    # Extract text
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    text_path = os.path.join(TEXT_DIR, f"{doc_id}.txt")
    with open(text_path, "w", encoding="utf-8") as f:
        f.write(text)

    return doc_id, file.filename

def get_pdf_text(document_id: str) -> str:
    """
    Retrieves the extracted text for a given PDF document ID from the saved .txt file.
    """
    text_path = os.path.join(TEXT_DIR, f"{document_id}.txt")
    if not os.path.exists(text_path):
        raise FileNotFoundError(f"Text file for document ID {document_id} not found.")
    
    with open(text_path, "r", encoding="utf-8") as f:
        return f.read()
