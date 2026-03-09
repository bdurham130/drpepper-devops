# 🥤 Dr Pepper DevOps — CIS486

A full stack MVC CRUD web application demonstrating end-to-end data round trip
with persistent MongoDB-backed storage.

## Live Deployments

- **Development (Render):** [dev-cis486.onrender.com](https://dev-cis486.onrender.com)
- **Production (GCP):** [drpepper.barrycumbie.com](http://drpepper.barrycumbie.com)

## Tech Stack

| Layer       | Technology                                    |
|-------------|-----------------------------------------------|
| Runtime     | Node.js                                       |
| Framework   | Express.js                                    |
| Database    | MongoDB Atlas (Mongoose ODM)                  |
| Templating  | EJS                                           |
| Frontend    | Bootstrap 5, normalize.css, jQuery / jQuery UI|
| DevOps      | nodemon, dotenv, GitHub Actions CI/CD         |
| Hosting     | Render (dev), GCP Compute Engine (production) |

## Features

- Full CRUD (Create, Read, Update, Delete) via RESTful API
- Persistent data stored in MongoDB Atlas
- MVC architecture (Models, Views, Controllers)
- Mobile-responsive Bootstrap 5 UI
- CI/CD pipeline via GitHub Actions
- Environment-based configuration with dotenv

## Development Workflow

1. Issues created for each feature
2. Feature branches created from `dev`
3. Pull requests submitted and reviewed
4. Merged into `dev`, then deployed

## Local Development

git clone https://github.com/bdurham130/drpepper-devops.git
cd drpepper-devops
npm install
# Create .env with MONGODB_URI and PORT
npm run dev

## Author

**Brandon Durham** — CIS486, 202
