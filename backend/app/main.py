from fastapi import FastAPI, Request, Depends
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
from . import schemas, crud
from .database import SessionLocal, Base, engine

# auto-create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# in-memory conversation state
conversation_state = {}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/whatsapp/webhook")
async def whatsapp_webhook(request: Request, db: Session = Depends(get_db)):
    form = await request.form()
    phone = (form.get("From") or "").strip()
    text = (form.get("Body") or "").strip()

    state = conversation_state.get(phone, {"step": "ask_product", "product_name": None, "user_name": None})

    if state["step"] == "ask_product":
        reply = "Which product is this review for?"
        state["step"] = "get_product"

    elif state["step"] == "get_product":
        state["product_name"] = text
        reply = "What's your name?"
        state["step"] = "get_name"

    elif state["step"] == "get_name":
        state["user_name"] = text
        reply = f"Please send your review for {state['product_name']}."
        state["step"] = "get_review"

    elif state["step"] == "get_review":
        review_in = schemas.ReviewCreate(
            contact_number=phone,
            user_name=state["user_name"],
            product_name=state["product_name"],
            product_review=text
        )
        crud.create_review(db, review_in)
        reply = f"Thanks {state['user_name']} — your review for {state['product_name']} has been recorded."
        conversation_state.pop(phone, None)
        return PlainTextResponse(reply)

    else:
        reply = "Let's start again. Which product is this for?"
        state = {"step": "get_product"}

    conversation_state[phone] = state
    return PlainTextResponse(reply)

@app.get("/api/reviews")
def list_reviews(db: Session = Depends(get_db)):
    return crud.get_reviews(db)
