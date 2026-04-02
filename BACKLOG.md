# Product Backlog — GitHub Issues to Create
# Copy-paste each of these into your GitHub repo as individual Issues.
# Create the Milestones FIRST, then assign issues to them.

============================================================
MILESTONES (Create these first at github.com/bdurham130/drpepper-devops/milestones)
============================================================

1. M1 — Proposal & Setup          | Due: Apr 2
2. M2 — MVC + Database            | Due: Apr 9
3. M3 — Authentication            | Due: Apr 16
4. M4 — UI/UX + Search            | Due: Apr 23
5. M5 — Deploy + Documentation    | Due: Apr 30
6. M6 — Final Polish              | Due: May 7

============================================================
EPIC LABELS (Create these as Labels on your repo)
============================================================

- epic:architecture    (color: #1d76db)
- epic:auth            (color: #d93f0b)
- epic:database        (color: #0e8a16)
- epic:ui-ux           (color: #e99695)
- epic:search          (color: #f9d0c4)
- epic:deploy          (color: #5319e7)
- epic:docs            (color: #fbca04)
- epic:core            (color: #b60205)

============================================================
ISSUES — Copy each block as a new GitHub Issue
============================================================

------------------------------------------------------------
ISSUE: Repo + Proposal Setup
Label: epic:core
Milestone: M1 — Proposal & Setup
------------------------------------------------------------
- [ ] Add instructor as collaborator
- [ ] Write README with app idea, target users, features, tech stack
- [ ] Create milestones in GitHub
- [ ] Create product backlog issues
- [ ] Configure GCP SSH with `student-key`

------------------------------------------------------------
ISSUE: Refactor to MVC folder structure
Label: epic:architecture
Milestone: M2 — MVC + Database
------------------------------------------------------------
- [ ] Create /config, /models, /routes, /controllers, /middleware, /views directories
- [ ] Move DB connection to config/db.mjs
- [ ] Create route files (index.mjs, api.mjs)
- [ ] Create controller files (pageController.mjs, scoreController.mjs)
- [ ] Slim app.mjs down to wiring only
- [ ] Verify server starts cleanly with new structure

------------------------------------------------------------
ISSUE: Migrate from native MongoDB driver to Mongoose
Label: epic:database
Milestone: M2 — MVC + Database
------------------------------------------------------------
- [ ] Replace `mongodb` package with `mongoose` in package.json
- [ ] Create Score model with schema (playerName, moves, difficulty, completedAt)
- [ ] Create User model with schema (username, password, role, createdAt)
- [ ] Update config/db.mjs to use mongoose.connect()
- [ ] Update scoreController to use Mongoose methods (Score.create, Score.find, etc.)
- [ ] Remove raw MongoClient code
- [ ] Test all CRUD operations against MongoDB Atlas

------------------------------------------------------------
ISSUE: Rename API from /attendance to /scores
Label: epic:architecture
Milestone: M2 — MVC + Database
------------------------------------------------------------
- [ ] Change POST /api/attendance → POST /api/scores
- [ ] Change GET /api/attendance → GET /api/scores
- [ ] Change DELETE /api/attendance/:id → DELETE /api/scores/:id
- [ ] Update frontend JS to call new endpoints
- [ ] Send proper { playerName, moves, difficulty } instead of { studentName, keyword }

------------------------------------------------------------
ISSUE: Set up EJS templating engine
Label: epic:architecture
Milestone: M2 — MVC + Database
------------------------------------------------------------
- [ ] Install ejs package
- [ ] Set view engine in app.mjs
- [ ] Create views/partials/header.ejs with nav
- [ ] Create views/partials/footer.ejs
- [ ] Create views/home.ejs (landing page)
- [ ] Create views/game.ejs (game board)
- [ ] Create views/leaderboard.ejs (scores table)

------------------------------------------------------------
ISSUE: Implement user registration
Label: epic:auth
Milestone: M3 — Authentication
------------------------------------------------------------
- [ ] Create views/register.ejs with registration form
- [ ] Create routes/auth.mjs with GET /auth/register and POST /auth/register
- [ ] Create controllers/authController.mjs with register logic
- [ ] Hash passwords with bcryptjs before saving
- [ ] Validate: username required, min 3 chars, unique
- [ ] Validate: password required, min 6 chars
- [ ] Redirect to login on success
- [ ] Show errors on failure

------------------------------------------------------------
ISSUE: Implement user login and sessions
Label: epic:auth
Milestone: M3 — Authentication
------------------------------------------------------------
- [ ] Create views/login.ejs with login form
- [ ] Add GET /auth/login and POST /auth/login routes
- [ ] Add login logic to authController (compare password, create session)
- [ ] Configure express-session with connect-mongo session store
- [ ] Add GET /auth/logout to destroy session
- [ ] Update nav partial to show login/logout state

------------------------------------------------------------
ISSUE: Add auth middleware and protected routes
Label: epic:auth
Milestone: M3 — Authentication
------------------------------------------------------------
- [ ] Implement isAuthenticated middleware (check session)
- [ ] Implement isAdmin middleware (check session + role)
- [ ] Protect POST /api/scores behind isAuthenticated
- [ ] Protect DELETE /api/scores/:id behind isAdmin
- [ ] Auto-populate playerName from session on score save
- [ ] Redirect unauthenticated users to login page

------------------------------------------------------------
ISSUE: Bootstrap UI polish and responsive layout
Label: epic:ui-ux
Milestone: M4 — UI/UX + Search
------------------------------------------------------------
- [ ] Redesign home page with feature cards
- [ ] Style game page with centered board and controls
- [ ] Style leaderboard as a Bootstrap table
- [ ] Add responsive breakpoints for mobile
- [ ] Improve card flip animations
- [ ] Clean visual hierarchy (spacing, typography, color)
- [ ] Add form validation feedback (Bootstrap validation classes)

------------------------------------------------------------
ISSUE: Add difficulty selector (4x4 and 6x6 grids)
Label: epic:ui-ux
Milestone: M4 — UI/UX + Search
------------------------------------------------------------
- [ ] Add grid size dropdown on game page
- [ ] Define 6x6 emoji set (36 cards / 18 pairs)
- [ ] Adjust CSS grid columns for 6x6
- [ ] Save difficulty with score to database
- [ ] Restart game when difficulty changes

------------------------------------------------------------
ISSUE: Leaderboard search and filtering
Label: epic:search
Milestone: M4 — UI/UX + Search
------------------------------------------------------------
- [ ] Add difficulty filter dropdown on leaderboard page
- [ ] Add player name search input
- [ ] Filter scores client-side on change
- [ ] Sort by fewest moves (already done in API)
- [ ] Display rank numbers in table

------------------------------------------------------------
ISSUE: Deploy to GCP with Nginx + PM2
Label: epic:deploy
Milestone: M5 — Deploy + Documentation
------------------------------------------------------------
- [ ] Set up GCP VM instance
- [ ] Install Node.js, Nginx, PM2 on VM
- [ ] Configure Nginx reverse proxy to Node app
- [ ] Set up .env on server with production MONGO_URI
- [ ] Start app with PM2 and enable on boot
- [ ] Configure firewall rules (allow 80/443)
- [ ] Update GitHub Actions deploy workflow

------------------------------------------------------------
ISSUE: Write deployment guide
Label: epic:docs
Milestone: M5 — Deploy + Documentation
------------------------------------------------------------
- [ ] Document step-by-step GCP VM setup
- [ ] Document Nginx configuration
- [ ] Document PM2 setup and commands
- [ ] Document environment variables needed
- [ ] Document GitHub Actions CI/CD pipeline
- [ ] Include troubleshooting tips

------------------------------------------------------------
ISSUE: Write debug case study
Label: epic:docs
Milestone: M5 — Deploy + Documentation
------------------------------------------------------------
- [ ] Identify a real bug encountered during development
- [ ] Document: what broke (symptoms, error messages)
- [ ] Document: why it broke (root cause analysis)
- [ ] Document: how it was fixed (solution, code changes)
- [ ] Include screenshots or logs if possible

------------------------------------------------------------
ISSUE: Developer notebook
Label: epic:core
Milestone: M6 — Final Polish
------------------------------------------------------------
- [ ] Weekly entries documenting progress, decisions, blockers
- [ ] Reflection on architecture decisions
- [ ] Reflection on what worked and what didn't
- [ ] Lessons learned

------------------------------------------------------------
ISSUE: Code review preparation
Label: epic:core
Milestone: M6 — Final Polish
------------------------------------------------------------
- [ ] Clean up code comments
- [ ] Remove console.logs used for debugging
- [ ] Verify .gitignore covers node_modules, .env
- [ ] Ensure all routes work end-to-end
- [ ] Test on fresh clone (npm install + npm start)
