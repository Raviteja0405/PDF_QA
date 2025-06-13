import os
from typing import List

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
    "You are a helpful assistant. Use the below context to answer the user's question.\n\nContext:\n{context}\n\nQuestion: {question}"
)

# Create the "stuff" chain using updated LangChain API
qa_chain = create_stuff_documents_chain(llm, prompt)


def generate_answer(document_id: str, question: str, chat_history: List[dict]) -> str:
    # Step 1: Get text from the document
    document_text = get_pdf_text(document_id)

    # Step 2: Wrap text into a Document object
    document = Document(page_content=document_text)

    # Step 3: Run chain with the context and question
    response = qa_chain.invoke({
        "context": [document],
        "question": question
    })

    return response
