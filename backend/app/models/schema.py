from pydantic import BaseModel
from typing import List

class PDFUploadResponse(BaseModel):
    document_id: str
    filename: str

class ChatRequest(BaseModel):
    document_id: str
    question: str
    chat_history: List[str]

class ChatResponse(BaseModel):
    answer: str
