#  Mental Wellness App

The **Mental Wellness App** is a full-stack web application designed to help users set goals, track progress, and receive support for their personal growth and mental well-being.

**Live App**: [https://group-7-project-2.onrender.com](https://group-7-project-2.onrender.com)  
**GitHub Repo**: [github.com/Andy-Ops254/group-7-project](https://github.com/Andy-Ops254/group-7-project)

---

##  Features

- Create and manage **wellness goals**
- Track progress with milestones
- Connect with supporters for motivation
- Responsive UI styled with CSS
- RESTful API powered by Flask & SQLAlchemy
- PostgreSQL database with migrations

---

##  Tech Stack

### Frontend
- React (components, hooks, state)
- CSS (custom styles)

### Backend
- Flask (REST API)
- Flask-SQLAlchemy & Flask-Migrate
- PostgreSQL (deployed with Render)

---

##  Installation & Setup

### 1️ Clone the Repository

```bash
git clone https://github.com/Andy-Ops254/group-7-project.git
```
```
cd group-7-project
```

## BACK-END setup
```
cd server
```
```
python3 -m venv venv
```
```
source venv/bin/activate
```
```
pip install -r requirements.txt
```

# Set environment variables (DATABASE_URI, SECRET_KEY, etc.)
```
touch .env
```

## run 
```
flask db upgrade       
```
```
python3 seed.py   
```
```     
flask run         
```

## front end
```
cd client
```
```
npm install
```
```
npm run dev
```         


# licence MIT

MIT licence