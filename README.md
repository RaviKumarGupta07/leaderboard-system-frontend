# 🏆 Leaderboard System – Frontend (React + Vite)

A responsive and dynamic leaderboard app built using **React**, **Vite**, and **Tailwind CSS**. Add users, claim random points, and view real-time leaderboard updates with a clean UI and pagination.

## 🌐 Live Demo

👉 [Leaderboard Frontend (Vercel)](https://leaderboard-system-frontend.vercel.app/)

## 🔗 Backend Repository

👉 [Leaderboard Backend (Express + MongoDB)](https://github.com/ravikumargupta07/leaderboard-system-backend)

---

## 🚀 Tech Stack

- ⚛️ React.js  
- ⚡ Vite  
- 🎨 Tailwind CSS  
- 🌐 Axios  
- 🔀 React Router  
- 🔔 React Hot Toast  

---

## ⚙️ Features

- ➕ Add users by name  
- 🎲 Claim random points (1–10)  
- 📊 Real-time leaderboard with rank updates  
- 🥇 Highlight top 3 users  
- 📄 Paginated user list (5 per page)  
- ✅ Toast notifications  
- 📱 Fully responsive and clean design  

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

# Folder Structure
src/
├── components/    # Reusable UI components (Leaderboard, TopThreeCard, etc.)
├── pages/         # Main routes/pages
├── App.jsx        # Root component with routes
└── main.jsx       # Entry point


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
