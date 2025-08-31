Lendsqr Project

🚀 Live Demo: https://marvellous-obatale-lendsqr-fe-test-ccxyf645a.vercel.app/

📦 GitHub Repository: https://github.com/MARVELGARR/lendsqr-fe-test

Welcome to the Lendsqr Dashboard project!
This repository contains the source code and documentation for a user management and lending admin dashboard built as part of a frontend engineering take-home assessment.

The goal was to replicate a fully interactive dashboard UI from a provided Figma design
, with responsive design, state management, and clean component-driven architecture using modern React and Next.js tooling.

Table of Contents

Features

Project Overview

Installation

Usage

Technologies Used

Approach & Decisions

Project Structure

Known Issues & Fixes

Contributing

License

Author

Features

✨ Key highlights of this project include:

🔐 Authentication UI – A styled login page with form validation and responsive layout.

📄 User Management – Paginated, searchable, and filterable user table.

🔍 User Detail View – Detailed user profile with cached data retrieval for faster navigation.

📊 Dashboard Overview – Widgets showing user stats and quick navigation links.

💾 Local Storage Caching – Improved UX with cached server data.

📱 Fully Responsive Design – Mobile-first, tablet, and desktop-friendly layouts.

🧩 Reusable Components – Shared UI pieces for consistent design and maintainability.

Project Overview

This project replicates the Lendsqr Admin Dashboard, staying faithful to the original design and focusing on clean code architecture, scalability, and developer-friendly patterns.

Core Functionalities

Login Page – Styled and validated login form (dummy authentication).

Dashboard Layout – Sidebar navigation, top navbar, and protected routes.

User List – Paginated table with filtering and search options.

User Profile – Individual user data displayed in a structured, tabbed view.

Offline Caching – Speeds up navigation when returning to previously loaded user data.

Installation

Clone the repository

git clone https://github.com/MARVELGARR/lendsqr-fe-test.git


Navigate into the project

cd lendsqr-fe-test


Install dependencies
Run:

npm install


If you encounter peer dependency conflicts, install with:

npm install --legacy-peer-deps


or

npm install --force


Note: Using --legacy-peer-deps ensures compatibility with older versions of libraries that might conflict during installation.

Environment Setup

Create a .env file in the project root.

Add necessary variables from .env.example (if provided).
Example:

NEXT_PUBLIC_API_URL=https://api.example.com

Usage

Start the development server

npm run dev


Visit the app in your browser

http://localhost:3000


Build for production

npm run build
npm run start

Technologies Used
Category	Tools & Libraries
Framework	Next.js
 (React-based framework)
Language	TypeScript

State Management	React Query

UI Components	React Icons

Styling	SCSS Modules

Forms & Validation	React Hook Form
 + Zod

Table Utilities	TanStack Table

Deployment	Vercel
Approach & Decisions
Why Next.js?

Simplifies routing and layout management.

Provides server-side rendering for faster initial load times.

Supports static optimization for production builds.

Why React Query?

Handles server state (caching, pagination, synchronization) efficiently.

Improves user experience with minimal boilerplate.

Why TanStack Table?

Offers powerful control over tables, including pagination, sorting, and filtering.

Why SCSS Modules?

Enables scoped styling for cleaner, modular components.

Why React Hook Form + Zod?

Lightweight and fast form handling with type-safe validation.

Why Local Storage Caching?

Reduces redundant API calls when navigating between user detail pages.

Improves perceived performance and offline resilience.

Project Structure
├── components/           # Reusable UI and feature components
│   ├── layout/           # Navbar, Sidebar, etc.
│   ├── user-profile/     # User profile-specific components
│
├── hooks/                # Custom React hooks (e.g., useLocalStorage)
├── pages/                # Next.js routing pages
│   ├── index.tsx         # Login page
│   ├── dashboard/        # Dashboard landing
│   ├── users/            # User list and detail pages
│
├── public/               # Static assets
├── styles/               # Global and module SCSS
├── types/                # Shared TypeScript types and interfaces
└── utils/                # Utility functions

Known Issues & Fixes
Issue	Solution
Peer dependency conflicts during npm install	Use npm install --legacy-peer-deps or npm install --force.
Styling not applying properly in dev	Restart the dev server or clear the .next cache folder.
Environment variables not recognized	Ensure .env is set up properly and the server has been restarted.
Contributing

Contributions are welcome! 🎉

Fork the repository.

Create a new branch:

git checkout -b feature-name


Commit your changes:

git commit -m "Add feature-name"


Push to the branch:

git push origin feature-name


Open a Pull Request for review.

License

This project is licensed under the MIT License
.

Author

Developed by Marvellous Obatale

LinkedIn

GitHub