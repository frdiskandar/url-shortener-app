# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a URL shortener application with a backend built using Express.js, PostgreSQL, and Redis, and a frontend built using React, TanStack Query, TanStack Form, and Shadcn.

## Backend Architecture

The backend is structured as follows:

- **app.js**: The main Express application setup.
- **modules/shortener**: Handles URL shortening logic.
- **modules/user**: Manages user-related operations.
- **shared/middleware/ErrorMiddleware.js**: Centralized error handling middleware.
- **shared/lib/redis-connection.js**: Redis client setup and connection management.
- **shared/utils/logger.js**: Logging utility using Winston.
- **bin/www**: Server startup script.

## Frontend Architecture

The frontend is structured as follows:

- **src/routes**: Contains route definitions and components.
- **src/components**: Reusable UI components.
- **src/hooks**: Custom React hooks.
- **src/utils**: Utility functions.

## Common Commands

### Backend

- **Start the development server**:
  ```bash
  npm run dev
  ```
- **Start the production server**:
  ```bash
  npm start
  ```

### Frontend

- **Start the development server**:
  ```bash
  npm run dev
  ```
- **Build for production**:
  ```bash
  npm run build
  ```
- **Run tests**:
  ```bash
  npm run test
  ```
- **Lint and format code**:
  ```bash
  npm run lint
  npm run format
  ```

## Key Features

- **URL Shortening**: Generate short URLs from long URLs.
- **User Management**: Register and manage users.
- **Redis Caching**: Cache frequently accessed URLs.
- **Error Handling**: Centralized error handling middleware.
- **Logging**: Comprehensive logging using Winston.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd shortlink
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the root directory with the necessary environment variables.
4. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
   ```
5. **Start the frontend server**:
   ```bash
   cd frond-end
   npm run dev
   ```

## Deployment

### Backend

- **Build and deploy**:
  ```bash
  npm run build
  node dist/server/index.mjs
  ```

### Frontend

- **Build and deploy**:
  ```bash
  npm run build
  ```

## Additional Information

- **Routing**: Uses TanStack Router for file-based routing.
- **Styling**: Uses Tailwind CSS for styling.
- **Form Handling**: Uses TanStack Form for form management.
- **Data Fetching**: Uses TanStack Query for data fetching.
- **UI Components**: Uses Shadcn for UI components.

For more detailed information, refer to the respective README files in the backend and frontend directories.