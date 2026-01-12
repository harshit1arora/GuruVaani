def normalize_text(text: str) -> str:
    fillers = ["uh", "um", "haan", "matlab", "actually"]
    for f in fillers:
        text = text.replace(f, "")
    return text.strip()
