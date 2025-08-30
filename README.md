# 🎓 College Event & Notice Management System (MERN)

A full-stack web application to manage *college events* and *notices* digitally.  
Built with *React.js, Node.js, Express.js, MongoDB*.  

---

## 🚀 Features
- 🔐 User authentication with JWT  
- 👨‍🎓 Role-based access (Student / Admin)  
- 📅 Event creation, listing, and management  
- 📢 Notices with categories (General / Academic / Placement)  
- 🖥 Responsive frontend with React Router  
- 🌐 REST APIs with Express.js and MongoDB  

---

## 🛠 Tech Stack
*Frontend*: React.js, React Router, Axios, Vite  
*Backend*: Node.js, Express.js, JWT, bcrypt  
*Database*: MongoDB Atlas  
*Deployment*: Netlify (frontend), Render (backend)  

---

## ⚙ Setup & Installation

### 1️⃣ Clone repository
```bash
git clone https://github.com/your-username/college-events.git
cd college-events
```

### 2️⃣ Backend Setup
```bash
cd backend
cp .env.example .env   # add your MongoDB URI + JWT_SECRET
npm install
npm run seed:admin     # creates admin (admin@example.com / Admin@123)
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 🔑 Default Admin Login
```bash
Email: admin@example.com  
Password: Admin@123
```

## 📜 License
This project is open-source for educational purposes. You can modify and use it freely.
