## 📋 React To-Do List App

A simple and responsive To-Do List built with React.
This app allows you to add, remove, mark tasks as complete, filter, sort, and persists data using localStorage.

---

### 🚀 Features

* ✅ Add, delete, and complete tasks
* 🔎 Filter tasks (All / Active / Completed)
* 🔤 Sort tasks (Newest first / A–Z)
* 💾 Stores tasks in browser localStorage
* ✏️ Inline editing support
* 📱 Responsive layout

---

### 🛠️ Tech Stack

* React
* CSS
* Font Awesome for icons
* LocalStorage for persistence
* React Testing Library (for optional test cases)

---

### 📦 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/RahulJangra79/csi-assignment-2.git
cd csi-assignment-2
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

The app will open at `http://localhost:3000`

---

### ✅ Testing Guidance

Basic unit tests are written using **React Testing Library**.

#### 🔧 Run tests:

```bash
npm test
```

#### 🧪 Included Test Cases:

* Add task via input and Enter key
* Mark task as complete
* Delete a task
* Filter completed tasks

#### 📄 Test File:

```
src/App.test.js
```


---

### 📁 Project Structure

```
src/
├── ToDoApp.js         // Main component
├── ToDoApp.css        // Styling
├── App.test.js        // Test cases
```

---

### 📌 Notes

* Keep your tasks short and meaningful
* Editing is inline, use the ✏️ icon
* All data is stored in browser memory

---
