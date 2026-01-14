import re

FILLERS = [
    "umm", "uh", "haan", "achha", "matlab", "yaar", "basically"
]

def normalize_text(text: str) -> str:
    text = text.lower()
    for word in FILLERS:
        text = re.sub(rf"\b{word}\b", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()
