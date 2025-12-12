

# 🚀 Scalable Task Manager App
A full-stack web application featuring authentication, profile management, and task CRUD operations, built using:

- React + TailwindCSS (Frontend)
- FastAPI + SQLite + JWT (Backend)

## 📌 Features

### 🔐 Authentication
- User Registration
- Login with JWT
- Logout
- Protected dashboard routes
- JWT stored in localStorage

### 👤 User Dashboard
- View profile
- Update profile
- Secure API communication
- Logout flow

### 📝 Task Manager (CRUD)
- Create, edit, delete tasks
- Search & filter tasks
- Responsive UI

### 🎨 Frontend (React + TailwindCSS)
- Clean UI with TailwindCSS
- Form validation
- AuthContext for global auth
- Component-based design

### ⚙️ Backend (FastAPI)
- JWT Authentication
- Password hashing (bcrypt)
- SQLite database
- SQLAlchemy ORM
- CORS enabled
- Scalable structure

# 🏃‍♂️ How to Run the Project Locally

## 1️⃣ Start the Backend (FastAPI)

Open PowerShell inside backend folder:

### Create & activate venv
python -m venv venv
.
env\Scripts\activate

### Install dependencies
pip install -r requirements.txt

### Create DB tables
python -c "import models, database; models.Base.metadata.create_all(bind=database.engine); print('DB created')"

### Run FastAPI server
uvicorn main:app --reload --port 8000

Backend URL: http://localhost:8000  

---

## 2️⃣ Start the Frontend (React)

Open new PowerShell window:


### Install node packages
npm install

### Start React app
npm start

Frontend URL: http://localhost:3000

---
