# Taskify Pro (Task Management System)

**Taskify Pro** is an enterprise-grade, highly responsive Full-Stack Task Management application designed to elevate productivity with unparalleled elegance. It features real-time countdown timers, advanced multi-criteria filtering, full CRUD capabilities with MongoDB, and an ultra-modern dark glassmorphism user interface.

---

## Application Screenshots

*(Tip: Take clear screenshots of your running application and place them in an `assets/images/` folder in your repository, then link them below as instructed).*

### 1. Main Dashboard & Statistics Overview
*This screenshot shows the main workspace with the real-time statistics blocks (Total, Pending, In Progress, Completed), the smart filter bar, and the interactive task list with pagination.*
<img width="1919" height="972" alt="Screenshot 2026-07-20 152035" src="https://github.com/user-attachments/assets/9a80d3d4-1134-4738-a08a-8cb073db57eb" />


### 2. Task Creation & Advanced Filtering
*This view highlights the sleek task creation form with strict validations and the smart search bar combined with status, priority, and timeline filters.*
<img width="1914" height="972" alt="Screenshot 2026-07-20 152201" src="https://github.com/user-attachments/assets/0ac0fb47-e990-413c-87d7-77741975643b" />


### 3. Task Editing & Real-time Overdue Timers
*This screenshot displays task items showcasing the real-time countdown / overdue timers (updating every second) and the inline editing mode.*
<img width="1868" height="973" alt="image" src="https://github.com/user-attachments/assets/0eb9c754-4278-42e6-a87b-07b3c8254142" />
<img width="1918" height="981" alt="image" src="https://github.com/user-attachments/assets/5062ce1e-5876-4ec2-8ddf-931504fbea2e" />


---

## Key Features

- **Full-Stack Architecture:** Powered by a robust Node.js/Express backend communicating seamlessly with a local MongoDB database via Mongoose.
- **Real-Time Countdown & Overdue Timers:** Dynamic timers that calculate exact remaining time or display pulsing "Overdue by X days/hours" alerts updated every second.
- **Smart Pagination:** Automatically splits large task lists (configurable to 5 tasks per page) with professional Next/Prev navigation controls.
- **Advanced Search & Multi-Criteria Filters:** Instant search by title or description combined with filters for Status, Priority, and Timelines (Due Soon / Overdue).
- **Animated Statistics Blocks:** Real-time counters tracking Total, Pending, In Progress, and Completed tasks with smooth hover animations.
- **Ultra-Modern UI/UX:** Built with Tailwind CSS, featuring a deep purple aesthetic, custom glassmorphism cards, and interactive Toast notifications (`react-hot-toast`).

---

## Tech Stack

### **Frontend:**
- **React.js** (Vite)
- **Tailwind CSS** (v4)
- **React Icons** (`react-icons`)
- **React Hot Toast** (`react-hot-toast`)

### **Backend:**
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose ODM**
- **CORS** & **Dotenv**
- **Nodemon** (for development)

---

# 📂 Project Directory Structure

```text
Task-management/
│
├── backend/                   # Node.js & Express Server
│   ├── models/                # Mongoose Schemas (Task.js)
│   ├── routes/                # API Endpoints (tasks.js)
│   ├── node_modules/          # Backend dependencies
│   ├── .env                   # Environment variables (PORT, MongoDB URI)
│   ├── package.json           # Backend package configuration
│   └── server.js              # Backend entry point
│
├── src/                       # React Frontend Source
│   ├── assets/                # Images & static files
│   ├── components/
│   │   ├── FilterBar.jsx      # Search & Filter controls
│   │   ├── TaskForm.jsx       # Task creation form
│   │   ├── TaskItem.jsx       # Task card with timer & actions
│   │   └── TaskList.jsx       # Task list & pagination
│   ├── App.jsx                # Main application component
│   ├── App.css                # Application styles
│   ├── index.css              # Tailwind & global styles
│   └── main.jsx               # React entry point
│
├── .gitignore                 # Ignores node_modules, .env, etc.
├── package.json               # Frontend package configuration
└── README.md                  # Project documentation
```

---

# ⚙️ Installation & Local Setup Guide

Follow these steps to set up and run the project on your local machine.

##  Prerequisites

Make sure you have the following installed:

* Node.js (v18 or later)
* Git
* MongoDB Community Server
* MongoDB Compass (Optional)

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/ashenlakmal/Taskify-Pro.git
cd Taskify-Pro
```

---

##  Step 2: Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskify_pro
```

Start the backend server:

```bash
npm run dev
```

If everything is configured correctly, you should see:

```text
Server is running beautifully on port: 5000
Successfully connected to Local MongoDB!!
```

---

##  Step 3: Frontend Setup

Open a new terminal and return to the project root:

```bash
cd ..
```

Install frontend dependencies:

```bash
npm install
```

Start the React (Vite) development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# 👨‍💻 Author

**Ashen Lakmal**

GitHub: **@ashenlakmal**
