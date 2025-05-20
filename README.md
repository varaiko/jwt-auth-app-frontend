# jwt-auth-app-frontend

A React-based frontend for the JWT Auth App, enabling users to register, log in, manage roles and permissions, create stories, and comment on them.

## Backend

This frontend is designed to work with the Spring Boot backend API. You can find the backend repository here: [varaiko/jwt-auth-app-backend](https://github.com/varaiko/jwt-auth-app-backend).

## Table of Contents

* [Features](#features)
* [Tech Stack & Prerequisites](#tech-stack--prerequisites)
* [Installation](#installation)
* [Configuration](#configuration)
* [Running the App](#running-the-app)
* [Building for Production](#building-for-production)
* [Project Structure](#project-structure)

## Features

* **User Authentication:** Register and log in via JWT
* **Role & Permission UI:** Manage roles, assign permissions, and assign roles to users
* **Story Management:** Create, view, edit, and delete stories
* **Commenting:** Add, edit, and delete comments on stories
* **Responsive Design:** Works across desktop and mobile viewports

## Tech Stack & Prerequisites

* **React:** 19.1.0
* **API Client:** Axios
* **Routing:** React Router (v6+)
* **State Management:** React Hooks & Context API
* **Node.js & npm:** Node.js v16+ and npm v8+ (or Yarn)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/varaiko/jwt-auth-app-frontend.git
   ```
2. **Navigate into the folder**

   ```bash
   cd jwt-auth-app-frontend
   ```
3. **Install dependencies**

   ```bash
   npm install    # or yarn install
   ```

## Configuration

Create a `.env` file in the project root with the following variable (adjust the URL if your backend runs elsewhere):

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

This environment variable is used by the API client to target your Spring Boot backend.

## Running the App

Start the development server:

```bash
npm start       # or yarn start
```

The app will open at `http://localhost:3000` and reload on changes.

## Building for Production

Generate optimized static assets:

```bash
npm run build   # or yarn build
```

The production build will be output to the `build/` directory.

## Project Structure

```
jwt-auth-app-frontend/
├── public/                 # Static assets and HTML template
├── src/
│   ├── auth/               # API, authentication utilities
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-based page components
│   ├── App.jsx             # App entry, router setup
│   └── index.js            # ReactDOM.render, global styles
└── .env                    # Environment variables
```

* **`auth/`**: contains API client configuration, token storage, and auth helpers.
* **`components/`**: presentational and container components used across pages.
* **`pages/`**: top-level views corresponding to routes (e.g. LoginPage, StoryListPage).
