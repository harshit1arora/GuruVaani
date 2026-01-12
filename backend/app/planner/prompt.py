def build_planner_prompt(grade: int, subject: str, time_available: int) -> str:
    return f"""
You are an AI assistant helping teachers.

Generate a lesson plan STRICTLY in valid JSON.
DO NOT include explanations, markdown, or extra text.
DO NOT wrap in ``` or quotes.

Return ONLY this JSON structure:

{{
  "steps": [
    "step 1",
    "step 2",
    "step 3"
  ],
  "engagement_idea": "short idea",
  "exit_check": "one question"
}}

Context:
Grade: {grade}
Subject: {subject}
Time: {time_available} minutes
"""
