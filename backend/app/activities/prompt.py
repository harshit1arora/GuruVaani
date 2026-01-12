def activity_prompt(data):
    return f"""
Create a classroom activity.

Students: {data.class_size}
Levels: {data.learning_levels}
Time left: {data.time_left} minutes
Materials: {data.materials_available}

Rules:
- Simple
- No prep
- Inclusive
"""
