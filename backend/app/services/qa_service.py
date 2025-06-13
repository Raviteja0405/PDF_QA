import os
from typing import List, Dict, Any

from langchain_core.documents import Document
from langchain.prompts import PromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_perplexity import ChatPerplexity

from app.services.pdf_service import get_pdf_text

from dotenv import load_dotenv 

load_dotenv()

# Initialize LLM
llm = ChatPerplexity(model="sonar", temperature=0.5)

# Prompt template
prompt = PromptTemplate.from_template(
    """You are a helpful assistant. Use only the information in the provided context to answer the user's question.
If the context does not contain the answer, respond with:
"I'm sorry, but I couldn't find relevant information in the document to answer that question."

Context:
{context}

Question: {question}
"""
)

# Create the "stuff" chain using updated LangChain API
qa_chain = create_stuff_documents_chain(llm, prompt)


def generate_answer(document_id: str, question: str, chat_history: List[Dict[str, Any]]) -> str:
    try:
        # Step 1: Extract text from the PDF document
        document_text = get_pdf_text(document_id)
        if not document_text.strip():
            return "The document is empty or could not be parsed."

        # Step 2: Wrap in a Document object
        document = Document(page_content=document_text)

        # Step 3: Invoke QA chain
        response = qa_chain.invoke({
            "context": [document],
            "question": question,
            # `chat_history` not used by this chain directly
        })

        return str(response)

    except Exception as e:
        return f"An error occurred while generating the answer: {str(e)}"