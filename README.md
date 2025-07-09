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
JWT_SECRET=your_jwt_secret
TOKEN_EXPIRES_IN=2h

### 🌐 Frontend (`/client/.env`)

REACT_APP_API_URL=

---

## 📸 Screenshots

> ![image](https://github.com/user-attachments/assets/5c2d6c07-9c36-4c37-ae0a-ca0fe152ff19)
> ![image](https://github.com/user-attachments/assets/aa7b972a-2a65-4e92-bfca-e8eea73b0403)
![image](https://github.com/user-attachments/assets/49ae9698-8a5f-4a59-b0fa-f98d3f49d1cc)
![image](https://github.com/user-attachments/assets/b5880f62-35b2-4a31-96d4-d498ef896a91)

---

## 👨‍💻 Author

**Ayush Juyal**  
