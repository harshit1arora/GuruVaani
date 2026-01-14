import requests
from app.config import settings

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

def call_groq(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": "You are a helpful teacher coach for Indian classrooms."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7,
        "max_tokens": 300,
    }

    response = requests.post(GROQ_URL, headers=headers, json=payload)

    data = response.json()

    if "choices" not in data:
        raise Exception(f"GROQ ERROR: {data}")

    return data["choices"][0]["message"]["content"]
