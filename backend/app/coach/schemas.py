from pydantic import BaseModel, Field


class CoachQueryRequest(BaseModel):
    class_level: int = Field(..., example=4)
    subject: str = Field(..., example="Math")
    problem_text: str = Field(
        ...,
        example="Group activity mein bacche disturb kar rahe hain"
    )


class CoachResponse(BaseModel):
    immediate_fix: str
    simple_activity: str
    concept_explanation: str
