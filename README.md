# 📝 MERN Stack Intern Assignment

A mini-project built using the **MERN stack** to demonstrate authentication, role-based access control, and dashboard CRUD operations.

---

## 🎯 Objective

To test a candidate’s understanding of:

* Authentication (JWT)
* Role-based access (Admin & Student)
* CRUD operations
* Pagination
* State management (Redux / Context)

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt

### Frontend

* React (Vite)
* Redux Toolkit
* Axios
* Tailwind CSS
* React Router DOM

---

## ✨ Features Implemented

### ✅ Authentication

* Sign Up & Login using Email + Password
* JWT-based authentication
* Password hashing using bcrypt

### ✅ User Roles

* **Admin**
* **Student**

### Test Credentials

  * Use the following credentials to test the Admin Dashboard and admin-level functionalities:
  * 👨‍💼 Admin Account
```
        Email: admin@test.com

        Password: admin123

```

### ✅ Dashboards

#### 👨‍💼 Admin Dashboard

* View all students
* Add / Edit / Delete student records
* Pagination in student list
* Secure access (Admin only)

#### 👨‍🎓 Student Dashboard

* View own profile only
* Update profile details

### ✅ Student Entity

Each student has:

* Name
* Email
* Course (e.g. MERN Bootcamp)
* Enrollment Date

### ✅ Frontend

* Login Page
* Signup Page
* Admin Dashboard
* Student Dashboard
* Protected Routes
* Logout functionality

---

# 📂 Project Structure

```
SOL9X_MERN_ASSIGNMENT/
│
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── db/
│   ├── .env.example.txt
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── routes/
│   ├── .env.example.txt
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

# 🚀 Backend Setup

## 1️⃣ Navigate to backend

```bash
cd backend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Setup Environment Variables

Rename `.env.example.txt` to `.env` and update values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_assignment
JWT_SECRET=your_jwt_secret
```

## 4️⃣ Start Backend Server

### Development mode (recommended)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

Backend will run at:

```
http://localhost:5000
```

---

# 🚀 Frontend Setup

## 1️⃣ Navigate to frontend

```bash
cd frontend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Setup Environment Variables

Rename `.env.example.txt` to `.env`:

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

⚠️ Note:

* Variable must start with `VITE_`
* Restart dev server after changing `.env`

## 4️⃣ Start Frontend

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 🔐 Role-Based Access Flow

* User logs in
* JWT stored in localStorage
* User redirected based on role:

  * Admin → `/admin`
  * Student → `/student`
* Protected routes prevent unauthorized access

---

# 📦 API Overview (Backend)

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Students (Admin only)

* `GET /api/students` (pagination supported)
* `POST /api/students`
* `PUT /api/students/:id`
* `DELETE /api/students/:id`

### Student (Self)

* `GET /api/students/me`
* `PUT /api/students/me`

---

# 📄 Pagination (Admin Student List)

* Implemented on backend using `page` & `limit`
* Controlled from frontend

Example:

```
GET /api/students?page=1&limit=5
```

---

# 🧠 State Management

* Redux Toolkit used for:

  * Authentication state
  * Logged-in user details

---

# ✅ Completed Bonus Features

* Redux for state management
* Logout functionality
* Pagination in Admin student list

---

# 📌 Notes

* Ensure MongoDB is running locally or provide a cloud URI
* Backend must be running before frontend

---

## 👨‍💻 Author

**Gaurav Deshmukh**
---

✅ Project is fully functional and ready for evaluation.
