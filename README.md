# 🎮 Emoji Match — CIS 486 Capstone Project

**Author:** Brandon Durham
**Course:** CIS 486 — Dev Lab Quebec
**Deployed URL:** [https://dev-cis486.onrender.com/](https://dev-cis486.onrender.com/)
**Repository:** [github.com/bdurham130/drpepper-devops](https://github.com/bdurham130/drpepper-devops)

---

## App Idea

Emoji Match is a full-stack memory card game where players flip cards to find matching emoji pairs. The app tracks scores in a MongoDB database, ranks players on a leaderboard, and supports user accounts with authentication. The project upgrades an existing working game into a clean, well-structured MVC application with real auth, role-based access, search/filtering, and professional deployment.

---

## Target Users

- **Students** in CIS 486 who want a quick, fun brain break between assignments
- **Casual players** looking for a simple memory challenge with difficulty options
- **Instructors/admins** who can manage the leaderboard and user accounts

---

## Features

### Core
- Emoji card matching game with 4×4 (easy) and 6×6 (hard) difficulty modes
- Score tracking — moves counted per game, saved to MongoDB
- Leaderboard with sorting by fewest moves
- Full CRUD on score records
- Clean deployment to GCP with CI/CD

### Authentication & Accounts
- User registration and login (bcrypt password hashing, express-session)
- Sessions stored in MongoDB via connect-mongo
- Protected routes — must be logged in to save scores
- Admin role — can delete any score, manage users

### Search & Filtering
- Filter leaderboard by difficulty (4×4 / 6×6)
- Search leaderboard by player name
- Sort by moves, date, or difficulty

### UI/UX
- Bootstrap 5 responsive layout
- EJS templating with shared partials (header, footer, nav)
- Dynamic nav showing login state
- Clean card flip animations

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Runtime     | Node.js 20.x                     |
| Framework   | Express.js                        |
| Database    | MongoDB Atlas + Mongoose          |
| Templating  | EJS                               |
| Auth        | bcryptjs + express-session        |
| Sessions    | connect-mongo                     |
| Frontend    | Bootstrap 5, vanilla JavaScript   |
| Deployment  | GCP VM, Nginx, PM2                |
| CI/CD       | GitHub Actions                    |
| Version Ctrl| Git + GitHub                      |

---

## Capability Boxes (Pathway 1 — Clean Upgrade)

| #  | Box                              | Points |
|----|----------------------------------|--------|
| 1  | Advanced Architecture (MVC)      | 10     |
| 2  | Authentication Upgrade           | 10     |
| 3  | Database Upgrade (MongoDB Atlas) | 10     |
| 4  | UI / UX Design Improvement       | 10     |
| 5  | Search / Tags Feature            | 10     |
| 6  | Debug Case Study                 | 10     |
| 7  | Deployment Guide / DevOps Writeup| 10     |
|    | **Total Capability Points**      | **70** |
|    | **Core**                         | **40** |
|    | **Grand Total**                  | **110**|

---

## Milestones

| Milestone    | Target Date | Deliverables                                      |
|--------------|-------------|---------------------------------------------------|
| M1 — Proposal    | Apr 2   | README, backlog, repo setup, GCP SSH              |
| M2 — MVC + DB    | Apr 9   | Mongoose models, MVC structure, API endpoints     |
| M3 — Auth        | Apr 16  | Register/login, sessions, protected routes, admin |
| M4 — UI + Search | Apr 23  | EJS views, Bootstrap polish, leaderboard filters  |
| M5 — Deploy + Docs| Apr 30 | GCP deploy, Nginx/PM2, deployment guide, debug writeup |
| M6 — Final       | May 7   | Code review, developer notebook, final polish     |

---

## Project Structure

```
drpepper-devops/
├── app.mjs                  # Express entry point
├── config/
│   └── db.mjs               # Mongoose connection
├── models/
│   ├── User.mjs             # User schema (auth)
│   └── Score.mjs            # Game score schema
├── controllers/
│   ├── pageController.mjs   # Renders EJS views
│   └── scoreController.mjs  # Score CRUD logic
├── routes/
│   ├── index.mjs            # Page routes
│   └── api.mjs              # API routes
├── middleware/
│   └── auth.mjs             # Auth + admin middleware
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── game.ejs
│   └── leaderboard.ejs
├── public/
│   ├── css/style.css
│   └── js/game.js
├── .env
├── .gitignore
└── package.json
```

---

## Setup

```bash
git clone https://github.com/bdurham130/drpepper-devops.git
cd drpepper-devops
npm install
# Add .env with MONGO_URI and SESSION_SECRET
npm run dev
```

