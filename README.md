# Emoji Match - CIS 486 Capstone Project

**Author:** Brandon Durham  
**Course:** CIS 486 - Dev Lab Quebec  
**Deployed URL:** [https://dev-cis486.onrender.com/](https://dev-cis486.onrender.com/)  
**Repository:** [github.com/bdurham130/drpepper-devops](https://github.com/bdurham130/drpepper-devops)

---

## App Idea

Emoji Match is a full-stack memory card game where players flip cards to find matching emoji pairs. The app tracks scores in MongoDB, ranks players on a leaderboard, and now includes admin authentication for managing leaderboard data. The project upgrades an existing working game into a clean MVC application with database integration, search/filtering, authentication, and deployment automation.

---

## Target Users

- **Students** in CIS 486 who want a quick brain break between assignments
- **Casual players** looking for a simple memory challenge with difficulty options
- **Instructors/admins** who need to manage leaderboard data

---

## Features

### Core
- Emoji card matching game with 4x4 and 6x6 difficulty modes
- Score tracking with MongoDB persistence
- Leaderboard sorted by fewest moves
- Create, read, update, and delete support for score records
- Deployment workflow for pushing updates to a GCP VM

### Authentication & Accounts
- Admin login with bcrypt password hashing and `express-session`
- Sessions stored in MongoDB with `connect-mongo`
- Protected admin routes for leaderboard updates and deletes
- Admin-only controls for editing and deleting leaderboard scores

### Search & Filtering
- Filter leaderboard by difficulty
- Search leaderboard by player name
- Dynamic client-side filtering after API load

### UI / UX
- Bootstrap 5 responsive layout
- EJS templating with shared partials
- Consistent navigation and page layout
- Clean card flip interactions for gameplay

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js 20.x |
| Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Templating | EJS |
| Auth | bcryptjs + express-session |
| Sessions | connect-mongo |
| Frontend | Bootstrap 5, vanilla JavaScript |
| Deployment | GCP VM, Nginx, PM2 |
| CI/CD | GitHub Actions |
| Version Control | Git + GitHub |

---

## Capability Boxes (Pathway 1 - Clean Upgrade)

| # | Box | Points |
|---|-----|--------|
| 1 | Advanced Architecture (MVC) | 10 |
| 2 | Authentication Upgrade | 10 |
| 3 | Database Upgrade (MongoDB Atlas) | 10 |
| 4 | UI / UX Design Improvement | 10 |
| 5 | Search / Tags Feature | 10 |
| 6 | Debug Case Study | 10 |
| 7 | Deployment Guide / DevOps Writeup | 10 |
|   | **Total Capability Points** | **70** |
|   | **Core** | **40** |
|   | **Grand Total** | **110** |

### Detailed Capability Boxes

| Box | What I Did | Evidence | Notes |
|-----|------------|----------|-------|
| Advanced Architecture | I rebuilt the project into a cleaner MVC structure with separate `models`, `controllers`, `routes`, `middleware`, `views`, and `public` folders. That made it much easier to add later features like authentication, admin-only actions, and leaderboard filtering without letting the app turn into one large file. | M2 - MVC + DB Milestone, MVC restructure commits, `app.mjs`, `routes/index.mjs`, `controllers/scoreController.mjs` | This capability box supported almost every other box because once the app was organized correctly, I had a clear place to put new code. |
| Authentication Upgrade | I added session-based authentication using `express-session`, `connect-mongo`, and `bcryptjs`. I also added an admin login page and protected routes so only a logged-in admin can change leaderboard data by editing or deleting scores. | M3 - Auth Milestone, Authentication Upgrade Issue, `models/User.mjs`, `middleware/auth.mjs`, `controllers/authController.mjs`, `views/login.ejs` | This repo uses session authentication, not JWT. This was one of the harder upgrades because I had to connect password hashing, sessions, middleware protection, and admin-only behavior across the app. |
| Database Upgrade | I connected the app to my own MongoDB Atlas database and used Mongoose models to store both users and game scores. I also moved database configuration into environment variables so the app can run locally and in deployment without hardcoding credentials. | M2 - MVC + DB Milestone, Database Upgrade Issue, `config/db.mjs`, `models/User.mjs`, `models/Score.mjs` | This upgrade made the project feel like a real full-stack application instead of a local-only game. |
| UI / UX Design Improvement | I improved the frontend with EJS views, Bootstrap 5, shared partials, cleaner page layouts, and a more usable navigation bar. I also kept the leaderboard and game pages visually consistent so the app feels more complete and professional. | M4 - UI + Search Milestone, UI / UX Improvement Issue, `views/partials/header.ejs`, `views/home.ejs`, `views/game.ejs`, `public/css/style.css` | This was not just visual polish. It also improved usability by making the site easier to navigate and keeping the interface consistent from page to page. |
| Search / Tags Feature | I added a search and filter feature on the leaderboard so users can search by player name and filter scores by difficulty. The page loads score data from the API and then updates dynamically in the browser as filters are applied. | M4 - UI + Search Milestone, Completed Search Function Issue, `views/leaderboard.ejs` | I had to rethink how I handled leaderboard data on the client side. Once I stored the loaded scores in a browser array, filtering became much easier to manage. |
| Debug Case Study | I documented the debugging process around deployment and update problems, especially cases where new code was pushed but the running app was not reflecting the latest version. I had to verify whether the issue was in GitHub, the VM, the pulled code, or the running PM2 process. | M5 - Deploy + Docs Milestone, Main Branch Code Problem Issue, Full Debug Case Study Issue | This was a humbling box because the problem was not just a coding bug. I had to trace the full deployment path and confirm where the update process had failed. |
| Deployment Guide / DevOps Writeup | I created a deployment workflow for running the app on a GCP VM with PM2 and automated deployment from GitHub Actions over SSH. The workflow pulls the latest code, installs dependencies, and restarts the Node process on the VM. | M5 - Deploy + Docs Milestone, Full Deployment Guide Issue, Sources Cited Issue, `.github/workflows/deploy-main-to-gcp.yml` | This box tied the whole project together because it pushed the app beyond local development and forced me to understand each deployment step clearly. |

---

## Milestones

| Milestone | Target Date | Deliverables |
|-----------|-------------|--------------|
| M1 - Proposal | Apr 2 | README, backlog, repo setup, GCP SSH |
| M2 - MVC + DB | Apr 9 | Mongoose models, MVC structure, API endpoints |
| M3 - Auth | Apr 16 | Admin login, sessions, protected routes, admin tools |
| M4 - UI + Search | Apr 23 | EJS views, Bootstrap polish, leaderboard filters |
| M5 - Deploy + Docs | Apr 30 | GCP deploy, Nginx/PM2, deployment guide, debug writeup |
| M6 - Final | May 7 | Code review, developer notebook, final polish |

---

## Project Structure

```text
drpepper-devops/
|-- app.mjs                  # Express entry point
|-- config/
|   |-- db.mjs               # Mongoose connection
|-- models/
|   |-- User.mjs             # User schema for admin auth
|   |-- Score.mjs            # Game score schema
|-- controllers/
|   |-- authController.mjs   # Admin login/logout logic
|   |-- pageController.mjs   # Renders EJS views
|   |-- scoreController.mjs  # Score CRUD logic
|-- routes/
|   |-- index.mjs            # Page routes
|   |-- api.mjs              # API routes
|-- middleware/
|   |-- auth.mjs             # Auth and admin middleware
|-- views/
|   |-- partials/
|   |   |-- header.ejs
|   |   |-- footer.ejs
|   |-- home.ejs
|   |-- game.ejs
|   |-- leaderboard.ejs
|   |-- login.ejs
|-- public/
|   |-- css/style.css
|   |-- js/game.js
|-- .env
|-- .gitignore
|-- package.json
```

---

## Setup

```bash
git clone https://github.com/bdurham130/drpepper-devops.git
cd drpepper-devops
npm install
# Add .env with MONGO_URI, SESSION_SECRET, ADMIN_USERNAME, and ADMIN_PASSWORD
npm run dev
```
