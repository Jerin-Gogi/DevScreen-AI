# DevScreen AI

A real-time collaborative coding interview platform that enables developers to conduct technical interviews with video, audio, and shared coding environment.

## Features

- Real-time video and audio calling powered by getstream.io
- Collaborative coding session with problem statements
- Session management (create, join, end sessions)
- Chat messaging during interviews
- User authentication via Clerk
- MongoDB for data persistence
- RESTful API backend with Express.js
- React frontend with Vite

## Project Structure

```
DevScreen AI/
├── backend/                  # Node.js/Express server
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Database models
│   │   ├── lib/              # External service configurations
│   │   ├── routes/           # API route definitions
│   │   └── server.js         # Server entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
├── frontend/                 # React/Vite client application
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   └── utils/            # Utility functions
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── package.json              # Root package.json with workspace scripts
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB instance
- Stream.io account
- Clerk account for authentication

### Installation

1. Clone the repository
```bash
git clone https://github.com/Jerin-Gogi/DevScreen-AI.git
cd DevScreen-AI
```

2. Install dependencies for both frontend and backend
```bash
npm run build
```

3. Set up environment variables
   - Copy `.env.example` to `.env` in both `backend/` and `frontend/` directories
   - Fill in the required values:
     - Backend: PORT, MONGODB_URI, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, STREAM_KEY, STREAM_SECRET
     - Frontend: VITE_CLERK_PUBLISHABLE_KEY, VITE_STREAM_KEY

4. Start the development servers
```bash
# Start backend server
npm run start --prefix backend

# Start frontend development server
npm run dev --prefix frontend
```

## API Endpoints

### Sessions
- `POST /api/sessions/create` - Create a new interview session
- `GET /api/sessions/active` - Get all active sessions
- `GET /api/sessions/recent` - Get recent completed sessions for user
- `GET /api/sessions/:id` - Get session by ID
- `POST /api/sessions/join/:id` - Join an existing session
- `POST /api/sessions/end/:id` - End a session (host only)

## Technologies Used

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Stream.io for video/chat functionality
- Clerk for authentication
- Socket.IO for real-time communication

### Frontend
- React 18+
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Stream React SDK for video/chat components

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_KEY=your_stream_key
STREAM_SECRET=your_stream_secret
```

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_KEY=your_stream_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Stream.io for providing video/chat infrastructure
- Clerk for authentication services
- MongoDB for database solution
- Vite team for the excellent frontend tooling