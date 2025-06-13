from fastapi import APIRouter, HTTPException
from app.models.schema import ChatRequest, ChatResponse
from app.services.qa_service import generate_answer

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_with_pdf(data: ChatRequest):
    try:
        answer = generate_answer(data.document_id, data.question, data.chat_history)
        return ChatResponse(answer=answer)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Document not found")
