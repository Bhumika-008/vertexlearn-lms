# VertexLearn AI — LMS Demo

A runnable demo inspired by the supplied LMS-AI PRD.

## Run
```powershell
docker compose up --build
```

Open http://localhost:5173

Demo roles are selectable in the UI:
- Student
- Instructor
- Admin

Backend health: http://localhost:4000/api/health
AI health: http://localhost:8000/health
