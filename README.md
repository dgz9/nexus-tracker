# NexusTrack - Task Tracker Application

A full-stack task tracking application built with React.js and Node.js, demonstrating modern web development practices with comprehensive CRUD operations, authentication, and a responsive UI.

## Overview

NexusTrack is a single-page application that allows users to efficiently manage tasks and projects. Built as a technical assessment, it showcases proficiency in full-stack JavaScript development with a focus on clean code, user experience, and scalable architecture.

## Technical Requirements Met

### Frontend (React.js) ✅
- Built with React.js using functional components and hooks
- View list of tasks with card/table views
- Add new tasks with form validation
- Edit existing tasks inline or via modal
- Delete tasks with confirmation
- Clean, responsive, and user-friendly UI
- Loading states with skeleton loaders
- Error states with toast notifications
- Comprehensive form validation

### Backend (Node.js) ✅
- RESTful API built with Express.js
- Implemented all required endpoints:
  - `GET /api/tasks` - Retrieve all tasks
  - `POST /api/tasks` - Create new task
  - `PUT /api/tasks/:id` - Update existing task
  - `DELETE /api/tasks/:id` - Delete task
- Persistent storage using PostgreSQL/SQLite with Prisma ORM
- JWT-based authentication (bonus feature)

### Technical Constraints ✅
- Node.js with Express for backend
- React.js for frontend
- Uses Axios for API calls
- Uses React Router for navigation
- Prisma for database management
- Built from scratch without full-stack generators

## Bonus Features Implemented

✅ **Clean Code Structure** - Modular architecture with clear separation of concerns  
✅ **Reusable Components** - Custom hooks and shared UI components  
✅ **Error Handling** - Comprehensive error handling with user feedback  
✅ **Authentication** - JWT-based auth with secure password hashing  
✅ **Additional Features** - Projects, status tracking, themes, search/filter

## Tech Stack

### Frontend
- **React.js 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **HeroUI (NextUI)** - Modern component library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma** - Type-safe ORM
- **PostgreSQL/SQLite** - Database (configurable)
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Features

### Core Task Management
- Create, read, update, and delete tasks
- Task status tracking (Pending, In Progress, Completed)
- Rich text descriptions
- Real-time search and filtering

### Project Organization
- Group tasks into color-coded projects
- Project-specific task counts
- Edit and delete projects

### User Experience
- JWT authentication with secure sessions
- Light/dark theme toggle
- Responsive design for all devices
- Loading skeletons and error states
- Toast notifications for actions
- Keyboard shortcuts

### Views & Navigation
- Card view for visual task management
- Table view for data-dense display
- Collapsible sidebar navigation
- Mobile-optimized floating action button

## Installation & Setup

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- PostgreSQL database (local or cloud service like Neon, Supabase, or Railway)

### Database Options

#### Option 1: Local PostgreSQL
- Install PostgreSQL locally
- Create a database: `createdb nexustrack`
- Use connection string: `postgresql://user:password@localhost:5432/nexustrack`

#### Option 2: Cloud PostgreSQL (Recommended for quick setup)
- **Neon** (https://neon.tech) - Free tier available
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - Simple deployment

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexus-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   echo "PORT=5000" > .env
   echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/nexustrack\"" >> .env
   echo "JWT_SECRET=\"your-secret-key\"" >> .env
   echo "FRONTEND_URL=\"http://localhost:5173\"" >> .env
   
   # Update DATABASE_URL with your PostgreSQL connection string
   # For local PostgreSQL: postgresql://user:password@localhost:5432/nexustrack
   # For Neon: postgresql://user:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
   
   # Run migrations
   npx prisma migrate dev
   
   # Start server
   npm run dev
   ```

3. **Frontend Setup** (new terminal)
   ```bash
   cd frontend
   npm install
   
   # Create .env file
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   
   # Start development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints
```
POST   /api/auth/register   - Create new user account
POST   /api/auth/login      - Login with credentials
GET    /api/auth/me         - Get authenticated user
```

### Task Endpoints (Protected)
```
GET    /api/tasks           - Get all user tasks
POST   /api/tasks           - Create new task
PUT    /api/tasks/:id       - Update task
DELETE /api/tasks/:id       - Delete task
GET    /api/tasks/stats     - Get task statistics
```

### Project Endpoints (Protected)
```
GET    /api/projects        - Get all user projects
POST   /api/projects        - Create new project
PUT    /api/projects/:id    - Update project
DELETE /api/projects/:id    - Delete project
```

### User Endpoints (Protected)
```
PUT    /api/users/profile   - Update user profile
PUT    /api/users/password  - Change password
```

## Project Structure

```
nexus-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Root component
│   └── package.json
│
├── backend/
│   ├── routes/             # API route handlers
│   ├── middleware/         # Express middleware
│   ├── utils/              # Helper functions
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── server.js           # Express server
│   └── package.json
│
└── README.md
```

## Key Design Decisions

### Architecture
- **Separation of Concerns** - Clear boundaries between UI, business logic, and data
- **Custom Hooks** - Encapsulated state logic for reusability
- **Modular Routes** - Backend routes organized by domain
- **Type Safety** - Prisma provides type-safe database queries

### User Experience
- **Optimistic Updates** - UI updates immediately while API calls process
- **Progressive Enhancement** - Core features work without JavaScript
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Lazy loading and code splitting

### Development
- **Environment Variables** - Secure configuration management
- **CORS Configuration** - Proper cross-origin setup
- **Error Boundaries** - Graceful error handling
- **Code Quality** - ESLint configuration for consistency

## Testing Approach

Manual testing covered:
- All CRUD operations
- Authentication flows
- Form validation edge cases
- Responsive design breakpoints
- Cross-browser compatibility
- API error scenarios

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Set framework preset to Vite
3. Add environment variable: `VITE_API_URL`

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set build command: `npm install && npx prisma generate`
3. Set start command: `npm start`
4. Add environment variables

## Demo

To quickly test the application:
1. Register a new account
2. Create a project (e.g., "Work Tasks")
3. Add some tasks to the project
4. Try different status updates
5. Use search and filters
6. Switch between card/table views
7. Toggle dark mode

## Future Enhancements

- Task due dates and reminders
- Task priority levels
- File attachments
- Comments on tasks
- Team collaboration
- Email notifications
- Recurring tasks
- Task templates
- Data export (CSV/PDF)
- Mobile app

## Submission Notes

This application was built from scratch specifically for the technical assessment, demonstrating:
- Proficiency in React.js and Node.js
- Understanding of RESTful API design
- Database design and management
- Authentication implementation
- UI/UX best practices
- Clean, maintainable code

All requirements have been met with additional features that showcase problem-solving abilities and attention to user experience.