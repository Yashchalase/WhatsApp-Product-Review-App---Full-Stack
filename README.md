# ?? WhatsApp Product Review App — Full Stack
**Tech Stack:** FastAPI · PostgreSQL · React (Vite) · Twilio WhatsApp Sandbox

## ?? Project Overview
This is a full-stack assignment where users submit **product reviews via WhatsApp**.
The backend collects a 3-step conversation flow, stores the review in **PostgreSQL**, and exposes an API.
The React frontend fetches & displays reviews in a clean table UI.

## ?? Features
### ? WhatsApp ? Backend Conversation Flow
User messages Twilio WhatsApp Sandbox ? Twilio sends webhook ? Your FastAPI backend replies:

User: Hi  
Server: Which product is this review for?

User: iPhone 15  
Server: What's your name?

User: Aditi  
Server: Please send your review for iPhone 15.

User: Amazing battery life  
Server: Thanks Aditi — your review has been recorded.

## ??? Database (PostgreSQL)
Table: reviews  
Columns: id, contact_number, user_name, product_name, product_review, created_at

## ??? Backend Setup (FastAPI)
### 1. Create Virtual Environment
python -m venv .venv  
.\.venv\Scripts\Activate.ps1

### 2. Install Dependencies
pip install -r requirements.txt

### 3. Set Environment
DATABASE_URL=postgresql://postgres:<your_password>@localhost:5432/reviews_db

### 4. Run Server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

## ?? API Endpoints
GET /api/reviews ? returns all reviews in JSON.

## ?? Frontend Setup (React + Vite)
cd frontend  
npm install  
npm run dev

Opens at http://localhost:5173/

## ?? WhatsApp Webhook Setup
ngrok http 8000  
Set Twilio webhook to:
https://<ngrok-id>.ngrok.io/whatsapp/webhook

## ?? Deliverables
- GitHub repo
- Screencast demo
- README.md (this)

## ?? Author
**Yash Chalase**
