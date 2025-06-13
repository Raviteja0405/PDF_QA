from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import pdf, chat
from dotenv import load_dotenv 
import os

load_dotenv()

app = FastAPI(title="PDF Q&A API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf.router, prefix="/api/pdf", tags=["PDF"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
