# 🤖 AI Chatbot WebApp

An intelligent **AI-powered chatbot web application** built using **React (Frontend)**, **FastAPI (Backend)**, and **MongoDB (Database)** — designed to function like ChatGPT with **multi-chat history**, **image analysis**, and a modern, user-friendly UI.

---

## 🚀 Features

✨ **Main Highlights**
- 🧍‍♂️ Secure **user authentication** (Signup/Login with JWT)
- 💬 **Chat history saving** — revisit previous conversations
- 🗂️ **Multiple chats** (create, delete, switch between them)
- 🖼️ **Image upload + AI analysis** — send an image with description and get intelligent insights
- 📋 **Copy answers easily** with a one-click copy button
- 🧠 **OpenRouter AI integration** for smart, real AI replies
- 🔒 **Protected routes** — chats are user-specific
- 🪶 **Clean UI** built for smooth, modern interaction
- 📱 **Responsive design** for all devices

---

## 🧰 Tech Stack

| Layer | Technology | Description |
|:------|:------------|:-------------|
| 💻 Frontend | **React.js** | Interactive and dynamic user interface |
| 🎨 Styling | **CSS / Inline Styles** | Modern, responsive look |
| ⚙️ Backend | **FastAPI** | High-performance Python backend |
| 🗃️ Database | **MongoDB** | Stores users, chats, and messages |
| 🔐 Auth | **JWT + bcrypt** | Secure login and token validation |
| 🧠 AI Model | **OpenRouter (GPT API)** | Handles text & image-based queries |

---

## 🧩 Project Structure

chatbot-webapp/
│
├── backend/
│ ├── app.py # FastAPI backend
│ ├── auth.py # Handles authentication and JWT
│ ├── database.py # MongoDB connection setup
│ ├── .env # Secrets and API keys
│ └── venv/ # Virtual environment (ignored)
│
├── frontend/
│ ├── src/
│ │ ├── components/ # ChatBox, Sidebar, LoginSignup etc.
│ │ ├── pages/ # Page routing
│ │ ├── api.js # Axios API helper
│ │ └── App.js # Routing logic
│ ├── package.json
│ └── node_modules/
│
├── .gitignore
├── README.md
└── requirements.txt


---

## ⚙️ Installation Steps

Follow these steps to run your project locally 👇

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Abhi1442004/chatbot-webapp.git
cd chatbot-webapp

2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate       # (Windows)
# OR
source venv/bin/activate    # (Mac/Linux)

pip install -r requirements.txt

3️⃣ Frontend Setup
cd ../frontend
npm install

4️⃣ Create .env File (inside backend/)
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openrouter_api_key
USE_MOCK_AI=false

5️⃣ Run Backend
cd backend
uvicorn app:app --reload

6️⃣ Run Frontend
cd frontend
npm start


Then open 🌐 http://localhost:3000

📸 Screenshots
🔐 Login Page

Simple and clean login/signup screen with JWT authentication.

💬 Chat Interface

Modern chat layout featuring:

Left sidebar for chats

Copy button for each answer

Chat history that loads on click

🖼️ Image Upload

Upload any image + add a caption — get a detailed AI explanation.

🖼️ (You can drag & drop screenshots here later!)

🔒 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection URL
JWT_SECRET	Secret key for JWT authentication
OPENAI_API_KEY	Your OpenRouter or OpenAI API key
USE_MOCK_AI	Use mock responses (true/false)
📦 Dependencies
🧠 Backend

fastapi

uvicorn

pymongo

bcrypt

python-dotenv

PyJWT

requests

python-multipart

💻 Frontend

react

axios

react-router-dom

🧠 How It Works

The user signs up or logs in (JWT stored locally)

Frontend sends the message/image to the backend

FastAPI authenticates and calls the OpenRouter API

AI generates a detailed response

Response is stored and displayed neatly in the UI

🧑‍💻 Developer

👨‍💻 Tiparala Abhi
🎓 Student & Developer | Intern at APSSDC (AWS Data Engineering & Android Development)
💡 Passionate about AI, Web Apps & Cloud
📫 GitHub
 | LinkedIn

🏁 Future Enhancements

🌍 Deploy backend on Render / Railway

☁️ Host frontend on Vercel / Netlify

🗣️ Add voice chat input

📊 Add chat analytics dashboard

🧩 Support PDF/document analysis

⭐ Acknowledgements

FastAPI

React

MongoDB

OpenRouter

OpenAI GPT Models

💖 Support

If you like this project, please ⭐ star the repository — it motivates me to build more cool stuff!

Made with 💙 by Tiparala Abhi