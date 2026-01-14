def build_reflection_prompt(mood: str, challenge: str, success: str) -> str:
    return f"""
You are an empathetic teacher coach.

Teacher reflection:
Mood: {mood}
Challenge faced today: {challenge}
Success achieved today: {success}

Give:
1. Emotional validation
2. Practical encouragement
3. One gentle suggestion for tomorrow

Respond in simple, supportive language.
"""
