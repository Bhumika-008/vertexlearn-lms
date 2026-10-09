import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI(title="VertexLearn AI Tutor")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Chat(BaseModel):
    question: str
    course_id: int | None = None


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "ai-service"
    }


@app.post("/api/chat")
def chat(body: Chat):

    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        return {
            "answer": "AI API key is not configured yet. Please add OPENAI_API_KEY to the environment.",
            "sources": []
        }

    try:
        client = OpenAI(api_key=api_key)

        course_context = """
You are the AI Tutor for VertexLearn, an AI-powered Learning Management System.

Your job is to help students understand academic and technical topics.

Current demo course context:
- Full Stack Web Development
- Data Structures & Algorithms
- Artificial Intelligence Fundamentals

Explain concepts clearly and step by step.
Use simple language when the student appears to be a beginner.
Give examples where useful.
For programming questions, include short code examples when appropriate.
For quiz requests, create useful MCQs and include answers.
Do not invent course-specific facts that are not provided.
"""

        response = client.responses.create(
            model=os.getenv("OPENAI_MODEL", "gpt-6-luna"),
            instructions=course_context,
            input=body.question
        )

        answer = response.output_text

        return {
            "answer": answer,
            "sources": [
                "VertexLearn course context",
                "AI Tutor knowledge"
            ]
        }

    except Exception as e:
        return {
            "answer": f"AI Tutor error: {str(e)}",
            "sources": []
        }