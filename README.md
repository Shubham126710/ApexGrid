<div align="center">
  <img src="frontend/public/logo.png" alt="ApexGrid Logo" width="128" />
  <h1 align="center">ApexGrid OS</h1>
  <p align="center">
    <strong>The premier operations, logistics, and telemetry management platform for elite motorsport teams worldwide.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## 📖 Overview

**ApexGrid OS** is a cutting-edge, full-stack management platform designed specifically for the high-stakes, fast-paced environment of global motorsport. It connects trackside telemetry, complex global logistics, and team operations into a single unified dashboard.

Built to ensure strict FIA compliance, the platform provides complete data isolation so each racing team can securely manage their unique operations, components, and expenditures.

## ✨ Features

- **Strict Data Isolation**: Multi-tenant architecture ensuring complete privacy between rival racing teams.
- **Interactive Dashboard**: A dynamic, data-driven command center showing live telemetry, active teams, and component lifecycle metrics.
- **Component Lifecycle Management**: Track engine and gearbox wear in real-time, knowing exactly when to swap parts before catastrophic failure.
- **Logistics & Expense Sync**: Seamlessly track complex global freight movements and maintain strict adherence to FIA financial regulations (Cost Cap).
- **Persistent Preferences**: Database-backed settings system to persist user toggles like Auto-Reroute and Critical Alerts.
- **Role-based Authentication**: Secure user accounts utilizing bcrypt and JWT tokens to prevent unauthorized paddock access.

## 📸 Functionality & Usage

### The Landing Page

![Home Page](frontend/public/screenshots/landing_page.png)
<p align="center"><em>A premium, high-performance interface that introduces the platform to teams.</em></p>

### Global Dashboard

![Global Dashboard](frontend/public/screenshots/dashboard.png)
<p align="center"><em>The primary workspace for race engineers, showing customized telemetry and active components.</em></p>

### Secure Authentication

![Login](frontend/public/screenshots/login.png.png)
<p align="center"><em>A robust login system authenticating users directly to their designated team's secure environment.</em></p>

### Team Onboarding

![Register](frontend/public/screenshots/register.png)
<p align="center"><em>Secure registration and team configuration flow.</em></p>

### Database Management

![Database](frontend/public/screenshots/database.png)
<p align="center"><em>Manage critical components, expenses, shipments, and complex queries efficiently.</em></p>

---

## 🛠 Tech Stack

This project is built using modern, enterprise-ready web technologies tailored for speed and reliability.

- **Frontend**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom premium motorsport UI tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Security**: JWT Authentication & bcrypt password hashing

### Project Structure

```bash
├── backend/            # Express.js Server & Prisma ORM
│   ├── prisma/         # PostgreSQL schema & migrations
│   └── src/            # Controllers, Services, Middleware, Routes
├── frontend/           # React + Vite Application
│   ├── public/         # Static assets, team logos, and images
│   └── src/            # React pages, components, and API integration
└── README.md           # You are here
```

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- A running PostgreSQL instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubham126710/ApexGrid.git
   cd ApexGrid
   ```

2. **Install dependencies**
   Open two terminals, one for the backend and one for the frontend:
   
   ```bash
   # Terminal 1: Backend
   cd backend
   npm install
   
   # Terminal 2: Frontend
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5001
   DATABASE_URL="postgresql://username:password@localhost:5432/apexgrid?schema=public"
   JWT_SECRET="your_super_secret_jwt_key"
   ```

4. **Initialize Database**
   In the backend directory, run Prisma migrations to build your schema:
   ```bash
   npx prisma migrate dev
   ```

5. **Run Development Servers**
   ```bash
   # Backend
   npm run dev
   
   # Frontend
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) with your browser to launch the ApexGrid OS.

## 🚢 Deployment

The frontend and backend can be easily deployed to modern cloud providers:
- **Frontend**: Deploy effortlessly to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
- **Backend**: Deploy your Node.js server and PostgreSQL database to platforms like [Render](https://render.com/) or [Railway](https://railway.app/).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <sub>Built with ❤️ by Shubham Upadhyay</sub>
</div>
