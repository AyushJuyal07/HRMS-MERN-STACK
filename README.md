# 💼 HRMS - Human Resource Management System

A modern, responsive HRMS dashboard built with the MERN Stack (MongoDB, Express, React, Node.js) to streamline candidate, employee, leave, and attendance management for HR professionals.

![HRMS Preview}(https://hrms-mern-stack.vercel.app/)

---

## 🚀 Features

✅ **Authentication**  
- Secure login system using JWT  
- Auto logout after 2 hours  
- Logout confirmation modal  

✅ **Dashboard Modules**  
- 📄 **Candidates Management**  
  - Add, filter, search, edit, delete candidates  
  - Upload resume and track hiring status  

- 👩‍💼 **Employees Management**  
  - View, filter, search employees  
  - Edit or delete employee records  

- 🕒 **Attendance Tracking**  
  - Mark attendance for all employees daily  
  - Dropdown to toggle Present/Absent  
  - Tracks attendance by date  

- 🌴 **Leaves Management**  
  - Only “Present” employees can apply for leave  
  - Admin can approve/reject leave  
  - Calendar view showing approved leaves  
  - Download leave documents  

---

## 🛠 Tech Stack

- **Frontend**: React.js, Vanila CSS  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT  
- **Calendar**: `react-calendar`  

---

## 📦 Folder Structure

📁 client/
└── src/
├── components/
├── pages/
└── services/

📁 server/
├── controllers/
├── models/
├── routes/
└── middleware/

---

## ⚙️ Environment Variables

### 🔐 Backend (`/server/.env`)

PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=jwt_key
TOKEN_EXPIRES_IN=2h

### 🌐 Frontend (`/client/.env`)

REACT_APP_API_URL=

## 📸 Screenshots

> ✅ Dashboard layout with fixed Sidebar and Topbar  
> ✅ Modular Leave Management with Calendar  
> ✅ Popups, filters, status dropdowns, and more  
> *(Insert screenshots here)*

---

## 👨‍💻 Author

**Ayush Juyal**  
