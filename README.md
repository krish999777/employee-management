# Employee Management System

Live App: https://employee-management-six-phi.vercel.app/

A full-stack employee management system with role-based access, authentication, and department management.

---

## 🚀 Features

### 🔐 Authentication
- Login & Signup
- JWT-based authentication
- Protected routes

### 👥 Role-Based Access
- Admin:
  - Manage all employees
  - Create, edit, delete employees
  - Manage departments
- Employee:
  - View own profile
  - Edit personal details

### 🧑‍💼 Employees
- View all employees (admin)
- Search and filter by department
- View individual employee details
- Edit and delete (admin only)

### 🏢 Departments
- Create, edit, delete departments
- Assign employees to departments
- View department details

### ⚙️ System Behavior
- Role-based UI rendering
- Secure backend validation
- Relational database design (PostgreSQL)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt for password hashing

### Database
- PostgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon

---

## 🧠 Key Concepts

- Role-based access control (RBAC)
- REST API design
- Relational database modeling
- Authentication & authorization

---

## 📦 Project Structure

client/   → React frontend  
server/   → Express backend  

---

## 🔑 Environment Variables

### Frontend (.env)
VITE_API_BASE_URL=your_backend_url

### Backend (.env)
PORT=your_port
DATABASE_URL=your_database_url  
JWT_SECRET=your_secret  

---

## 🧪 Running Locally

### Clone repository
git clone https://github.com/krish999777/employee-management
cd employee-management  

### Backend
cd backend  
npm install  
npm run dev  

### Frontend
cd frontend  
npm install  
npm run dev  

---

## ⚠️ Notes

- Passwords are securely hashed using bcrypt
- Role-based access enforced on both frontend and backend

---

## 👤 Author

Krish Shah