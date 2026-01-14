from pydantic import BaseModel, Field


class CoachQueryRequest(BaseModel):
    class_level: str = Field(..., example="Grade 4")
    subject: str = Field(..., example="Math")
    problem_text: str = Field(
        ...,
        example="Group activity mein bacche disturb kar rahe hain"
    )
    language: str = Field(default="Hindi/Hinglish", example="Hinglish")


class CoachingCard(BaseModel):
    title: str
    text: str


class CoachResponse(BaseModel):
    now_fix: CoachingCard
    activity: CoachingCard
    explain: CoachingCard
