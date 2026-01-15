# GuruVaani: Your Just-in-Time Classroom Coach 🎙️🏫

**Team GuruVaani: Harshit Arora & Tejas Ranjeet**  
*Developed for the Shikshalokam Hackathon*

GuruVaani is an AI-powered, voice-first coaching assistant designed specifically for teachers in Indian government schools. It provides immediate, contextual, and pedagogical support right when a teacher needs it—during the active 40 minutes of a classroom session.

---

## 🌟 The Vision

In high-pressure classroom environments, teachers often face unexpected challenges—ranging from student distractions to complex concept explanations. GuruVaani acts as a **"Co-pilot for the Classroom,"** reducing cognitive load and empowering teachers with expert-level pedagogical strategies in seconds.

## ✨ Key Features

- **🎙️ Voice-First Interaction**: Describe classroom problems naturally in **Hindi or English**. No typing required during busy class hours.
- **🤖 AI-Powered Coaching**: Leverages **Groq (LLM)** to provide 3-card immediate advice:
  - **⚡ Quick Fix**: What to do in the next 30 seconds.
  - **🎯 Simple Activity**: A "hook" or activity to engage students.
  - **💡 Concept Clarity**: A simple way to explain the topic using local analogies.
- **📺 Real-time Video Resources**: Automatically fetches curated, quota-free YouTube videos relevant to the specific classroom problem.
- **📅 Smart AI Planner**: Generates lesson plans aligned with grade-level competencies and syllabus.
- **🤝 Peer Wisdom**: A community space to share challenges and learn from other teachers' experiences.
- **📜 Professional Recognition**: Generates participation certificates to recognize teacher engagement in reflective practice.

## 🚀 Tech Stack

- **Frontend**: React.js (Vite), TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: FastAPI (Python), SQLAlchemy, PostgreSQL.
- **AI/ML**: Groq API (Llama 3), SpeechRecognition API.
- **Search**: Custom Quota-free YouTube Search Integration.
- **Deployment**: Render (Full-stack).

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Groq API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend

2. Create a .env file and add your credentials:
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_secret
   GROQ_API_KEY=your_groq_key
   
3. Install dependencies:
   npm install

4. Start the development server
   npm run dev

   ## 🌍 Social Impact & Scalability
GuruVaani is built on the principles of Societal Platform thinking:

- Inclusion : Native language support (Hindi/English) ensures accessibility.
- Low-Bandspeed Friendly : Optimized for performance in areas with limited connectivity.
- Agency : Focuses on augmenting teacher capability, not replacing it.
  
### Developed with ❤️ by Team GuruVaani
Harshit Arora & Tejas Ranjeet
