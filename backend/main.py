from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class TextInput(BaseModel):
    text: str

@app.post("/analyze")
def analyze_emotion(data: TextInput):
    user_text = data.text.lower().strip()

    if not user_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    if any(word in user_text for word in ["sad", "unhappy", "down", "depressed"]):
        emotion = "Sad 😞"
    elif any(word in user_text for word in ["happy", "glad", "joy", "pleased", "delighted"]):
        emotion = "Happy 😃"
    elif any(word in user_text for word in ["nervous", "anxious", "worried", "scared", "fear"]):
        emotion = "Anxious 🥺"
    elif any(word in user_text for word in ["excited", "thrilled", "eager", "enthusiastic"]):
        emotion = "Excited 😎"
    elif any(word in user_text for word in ["confident", "sure", "positive", "certain"]):
        emotion = "Confident 🤩"
    elif any(word in user_text for word in ["angry", "mad", "furious", "irritated"]):
        emotion = "Angry 😡"
    else:
        emotion = random.choice(["Calm 🙂‍↕️", "Neutral", "Content"])

    confidence = round(random.uniform(0.75, 0.95), 2)

    return {"emotion": emotion, "confidence": confidence}
