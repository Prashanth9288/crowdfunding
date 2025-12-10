# FundFlow - Crowdfunding Platform

FundFlow is a modern, full-stack crowdfunding platform designed to help users raise funds for their creative projects and startups. It features a responsive React frontend with a polished UI and a robust Node.js/Express backend.

## Features

- **User Authentication**: Secure sign-up and login using Firebase Authentication.
- **Campaign Management**: Create, view, and back campaigns.
- **Real-time Updates**: Live updates using Socket.io.
- **Responsive Design**: Built with Tailwind CSS and Shadcn/UI for a mobile-friendly experience.
- **Recommendation Engine**: Basic recommendation service for campaigns.

## Tech Stack

### Client

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Framer Motion, Lucide React
- **State/Auth**: Firebase Client SDK
- **UI Components**: Radix UI

### Server

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Auth**: Firebase Admin SDK

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB installed locally or a generic MongoDB Atlas URI
- Firebase Project (for Auth and Admin SDK)

## Setup & Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd FundFlow
```

### 2. Client Setup

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd ../server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
# Add any required Firebase Admin keys if using service account
```

## Running the Application

### Start the Backend

```bash
# In the server directory
npm run dev
```

The server will start on `http://localhost:5000`.

### Start the Frontend

```bash
# In the client directory
npm run dev
```

The frontend will start on `http://localhost:5173`.

## Deployment

### Frontend (Vercel)

1.  Connect your GitHub repo to Vercel.
2.  Set the `Output Directory` to `dist` (if not auto-detected).
3.  Add all `VITE_FIREBASE_*` variables from your client `.env` to Vercel's Environment Variables.

### Backend (Render/Heroku)

1.  Connect your repo.
2.  Set the start command to `npm start`.
3.  Add `MONGODB_URI` and any other backend secrets to the environment variables.

## License

MIT
