# 📚 PDF Chatbot using FastAPI & React

This is a full-stack AI-powered chatbot application that allows users to upload a PDF and ask questions based on its content. It uses **FastAPI** for the backend, **React** for the frontend, and simple local storage for document text context.

---

## 🔍 Overview

This application lets users:

- Upload a PDF document  
- Ask questions about the uploaded PDF  
- Get contextual answers from an LLM (via LangChain, OpenAI, or similar)  
- View chat history  
- Prevent sending questions before uploading a document  
- See loading state while waiting for response  

---

## ⚙️ Setup Instructions

### 1. Backend (FastAPI)

#### Requirements

- Python 3.10+  
- `pip install -r requirements.txt`

#### Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Folder Structure (Backend)

```
backend/
├── main.py
├── api/
│   └── endpoints/
│       ├── chat.py
│       └── pdf.py
├── services/
│   ├── pdf_service.py
│   └── qa_service.py
├── utils/
│   └── file_utils.py
├── models/
│   └── schema.py
└── data/
    ├── pdfs/
    └── texts/
```

---

### 2. Frontend (React)

#### Requirements

- Node.js 18+  
- `npm install`

#### Installation

```bash
cd frontend
npm install
npm run dev
```

#### Folder Structure (Frontend)

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatInput.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── Navbar.jsx
│   │   └── PDFUpload.jsx
│   ├── pages/
│   │   └── ChatPage.jsx
│   ├── App.jsx
│   └── main.jsx
```

---

## 🧪 API Documentation

### 1. `POST /api/pdf/upload/`

**Upload a PDF and extract text**

**Request:**  
* `multipart/form-data` with a PDF file

**Response:**
```json
{
  "document_id": "uuid-string",
  "filename": "uploaded_file.pdf"
}
```

---

### 2. `POST /api/chat`

**Ask a question about an uploaded PDF**

**Request:**
```json
{
  "document_id": "uuid-string",
  "question": "What is the summary?",
  "chat_history": ["user: ...", "assistant: ..."]
}
```

**Response:**
```json
{
  "answer": "This PDF talks about..."
}
```

---

## 🧱 Application Architecture

### 📦 Backend (FastAPI)

- `upload_pdf`: Saves PDF locally and extracts text using `PyPDF2`  
- `chat`: Uses stored plain text and chat history to generate an answer using LLM (via `LangChain`, OpenAI, or similar)  
- `services/pdf_service.py`: Handles saving and text extraction  
- `services/qa_service.py`: Handles query answering using extracted text  

### 🖥️ Frontend (React + Tailwind CSS)

- `PDFUpload`: Handles PDF file upload and sets the `document_id`  
- `ChatInput`: Handles user input with disabled state during loading or if no PDF is uploaded  
- `ChatMessage`: Renders messages with avatar and styling  
- `ChatPage`: Main logic for managing state, sending questions, and rendering chat  

---

## 🚀 Features

- 📄 PDF Upload with progress and filename display  
- 🧠 Ask context-aware questions  
- 🔒 Disable input until PDF is uploaded  
- 🔄 Loading state with "Assistant is typing..."  
- 🔔 Toast notifications using `react-hot-toast`  
- 🎨 Responsive UI using Tailwind CSS  

---

## 🔧 Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, react-hot-toast  
- **Backend:** FastAPI, LangChain / OpenAI, PyPDF2  
- **Storage:** Local file system for PDFs and extracted text  

---

## 🧑‍💻 Author

Built with ❤️ by D. Ravi Teja.

---

## 📝 License

This project is licensed under the MIT License.
