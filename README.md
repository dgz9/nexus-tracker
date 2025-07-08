# NexusTrack - Task Tracker Application

A full-stack task tracker application built with React.js and Node.js that demonstrates CRUD operations, authentication, and modern web development practices.

## Overview

NexusTrack is a single-page application that allows users to manage tasks and projects efficiently. It features a clean, responsive UI with real-time updates, comprehensive error handling, and a robust authentication system.

## Requirements Met

### Core Requirements
- ✅ **CRUD Operations**: Create, Read, Update, and Delete tasks
- ✅ **React.js Frontend**: Built with functional components and hooks
- ✅ **Node.js Backend**: RESTful API using Express
- ✅ **Persistent Storage**: SQLite database with Prisma ORM
- ✅ **Responsive Design**: Clean, mobile-friendly UI
- ✅ **Loading & Error States**: Comprehensive feedback during API calls
- ✅ **Form Validation**: Client-side validation for all forms

### Bonus Features Implemented
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Project Management**: Organize tasks into projects
- ✅ **Advanced UI Components**: Modal dialogs, toast notifications, animations
- ✅ **Dark/Light Theme**: User preference persistence
- ✅ **Reusable Components**: Modular component architecture
- ✅ **Clean Code Structure**: Organized file structure with clear naming conventions
- ✅ **Error Handling**: Comprehensive error handling with user feedback

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Personal Task Management**: Each user has their own private task list
- **Project Organization**: Group tasks into projects with custom colors
- **Beautiful UI**: Modern interface built with HeroUI and Tailwind CSS
- **Dark/Light Mode**: Toggle between dark and light themes
- **Task Operations**: Create, read, update, and delete tasks with ease
- **Task Status Tracking**: Manage tasks as pending, in-progress, or completed
- **Real-time Statistics**: View task completion rates and progress by project
- **Responsive Design**: Fully responsive design with mobile-optimized sidebar
- **Search & Filter**: Find tasks quickly with search and status filters
- **Multiple Views**: Switch between card and table view for tasks
- **Notifications**: Real-time notification system
- **User Profile**: Manage user settings and preferences

## Tech Stack

### Frontend
- **React.js** - UI library with hooks and functional components
- **HeroUI** - Modern React UI library for beautiful components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite** - Lightweight database (easily switchable to PostgreSQL)
- **Prisma** - Modern ORM for type-safe database access
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation & Setup

### Clone the repository
```bash
git clone <repository-url>
cd nexus-tracker
```

### Quick Start

The application uses SQLite by default, so no database setup is required!

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on the example:
```bash
cp .env.example .env
```

Update the JWT_SECRET in the `.env` file:
```env
PORT=5000
DATABASE_URL="file:./tasks.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
FRONTEND_URL="http://localhost:5173"
```

4. Initialize the database:
```bash
npx prisma migrate dev
```

5. Start the backend server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Request/Response Examples

#### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### Create Task
```json
POST /api/tasks
Headers: { "Authorization": "Bearer jwt-token-here" }
{
  "title": "Complete project",
  "description": "Finish the NexusTrack app",
  "status": "PENDING",
  "projectId": "project-id-here" // Optional
}
```

#### Create Project
```json
POST /api/projects
Headers: { "Authorization": "Bearer jwt-token-here" }
{
  "name": "Website Redesign",
  "description": "Redesign the company website",
  "color": "#3B82F6"
}
```

## Project Structure

```
nexus-tracker/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── middleware/
│   │   └── auth.js         # Authentication middleware
│   ├── utils/
│   │   └── jwt.js          # JWT utilities
│   ├── server.js           # Express server and API routes
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── AppNavbar.jsx      # Consistent navbar component
│   │   │   ├── Notifications.jsx  # Notification dropdown
│   │   │   ├── PrivateRoute.jsx   # Protected route wrapper
│   │   │   ├── Sidebar.jsx        # Collapsible sidebar
│   │   │   ├── TaskCard.jsx       # Task card component
│   │   │   └── UniversalModal.jsx # Reusable modal component
│   │   ├── contexts/       # React contexts
│   │   │   ├── AuthContext.jsx    # Authentication context
│   │   │   ├── ThemeContext.jsx   # Theme management
│   │   │   ├── useAuth.js         # Auth hook
│   │   │   └── useTheme.js        # Theme hook
│   │   ├── pages/          # Page components
│   │   │   ├── Landing.jsx        # Landing page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   ├── Dashboard.jsx      # Main dashboard
│   │   │   └── Profile.jsx        # User profile page
│   │   ├── App.jsx         # Main app component with routing
│   │   ├── main.jsx        # Application entry point
│   │   └── index.css       # Tailwind CSS imports
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Tasks (Protected - Requires Authentication)
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats` - Get task statistics

### Projects (Protected - Requires Authentication)
- `GET /api/projects` - Get all projects for the authenticated user
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### User Profile (Protected)
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update user password

## Available Scripts

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Set build command: `cd frontend && npm install && npm run build`
4. Set output directory: `frontend/dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend
For production deployment, consider platforms that support Node.js with persistent storage:
- Railway.app (recommended)
- Render.com
- Fly.io

See `DEPLOYMENT.md` for detailed deployment instructions.

## Development Approach

This application was built with a focus on:
1. **User Experience**: Intuitive interface with smooth interactions
2. **Code Quality**: Clean, maintainable code following best practices
3. **Performance**: Optimized rendering and efficient API calls
4. **Scalability**: Modular architecture that can grow with requirements
5. **Security**: Proper authentication and input validation

## Key Design Decisions

### Frontend Architecture
- **Component Structure**: Modular components with clear separation of concerns
- **State Management**: Context API for global state (auth, theme)
- **Error Handling**: Centralized error handling with user-friendly messages
- **Form Validation**: Real-time validation with helpful error messages

### Backend Architecture
- **Database Choice**: SQLite for simplicity and portability
- **ORM**: Prisma for type-safe database queries
- **Authentication**: JWT tokens for stateless authentication
- **API Design**: RESTful endpoints with consistent naming conventions

### Code Quality
- **ESLint**: Configured for code consistency
- **Naming Conventions**: Clear, descriptive names for variables and functions
- **File Organization**: Logical grouping of related functionality
- **Reusability**: Shared components and utilities

## Testing the Application

1. **Register**: Create a new account
2. **Create Projects**: Organize your tasks
3. **Add Tasks**: Create tasks with descriptions
4. **Update Status**: Track progress (Pending → In Progress → Completed)
5. **Edit/Delete**: Modify or remove tasks as needed
6. **Filter & Search**: Find tasks quickly
7. **Theme Toggle**: Switch between light and dark modes

## Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Submission Notes

- **Source Code**: Full source code for both frontend and backend is included
- **Local Setup**: Follow the installation instructions above to run locally
- **Clean Code**: Organized structure with clear naming conventions
- **Error Handling**: Comprehensive error handling throughout the application
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Authentication**: Bonus feature implemented with JWT tokens
- **Reusable Components**: Modular architecture for easy maintenance

## Future Enhancements

- Email verification for new users
- Password reset functionality
- Task collaboration and sharing
- Task categories and tags
- Due dates and reminders
- File attachments
- Activity history
- Export tasks to CSV/PDF
- Real-time updates with WebSockets
- Mobile app version

## License

MIT