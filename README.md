# Nexus Tracker

A modern task management application built with Next.js, featuring project organization, task tracking, and team collaboration capabilities.

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd nexus-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Set up the database
npx prisma migrate dev
npx prisma generate

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Features

- **User Authentication**: Secure JWT-based authentication with registration and login
- **Project Management**: Create, update, and delete projects with color coding
- **Task Management**: Comprehensive task tracking with priorities, due dates, and status updates
- **Dashboard Analytics**: Visual statistics and progress tracking
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar
- **Real-time Search**: Filter tasks and projects instantly
- **Profile Management**: Update user information and change passwords
- **Dark Mode Support**: Built with modern UI components from HeroUI

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, HeroUI, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nexus-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nexus_tracker"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

5. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task
- `PUT /api/tasks/[id]/status` - Update task status
- `GET /api/tasks/stats` - Get task statistics

### Users
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Change password

## Project Structure

```
nexus-tracker/
├── public/                # Static assets
│   ├── favicon.svg
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Auth layout group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Dashboard page
│   │   ├── profile/      # Profile page
│   │   ├── layout.js     # Root layout
│   │   └── page.js       # Landing page
│   ├── components/       # React components
│   │   ├── AppNavbar.jsx
│   │   ├── DashboardNavbar.jsx
│   │   ├── Notifications.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── SEO.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskDetailsModal.jsx
│   │   └── UniversalModal.jsx
│   ├── contexts/         # React contexts
│   │   ├── AuthContext.js
│   │   ├── AuthProvider.jsx
│   │   ├── ThemeContext.js
│   │   └── ThemeProvider.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useForm.js
│   │   ├── useModal.js
│   │   ├── useResponsive.js
│   │   ├── useSearchFilter.js
│   │   ├── useTask.js
│   │   └── useToggle.js
│   └── utils/           # Utility functions
│       ├── auth.js
│       ├── jwt.js
│       ├── prisma.js
│       └── toast.js
├── prisma/
│   └── schema.prisma    # Database schema
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore file
├── eslint.config.mjs    # ESLint configuration
├── jsconfig.json        # JavaScript configuration
├── next.config.mjs      # Next.js configuration
├── package.json         # Dependencies and scripts
├── postcss.config.mjs   # PostCSS configuration
├── README.md            # Project documentation
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Database Schema

The application uses three main models:

- **User**: Stores user authentication and profile information
- **Project**: Manages projects with color coding
- **Task**: Handles tasks with priorities, due dates, and status tracking

## Authentication

The application uses JWT tokens for authentication:
- Tokens are stored in httpOnly cookies
- Protected routes require valid authentication
- Token expiration is set to 7 days

## Development Notes

- The application uses Next.js 15 with the App Router
- All API routes include proper error handling
- Database queries are optimized with Prisma
- Components are built with HeroUI for consistent styling
- Form validation is implemented on both client and server
- Tailwind CSS v4 with CSS-based configuration
- JWT authentication with httpOnly cookies
- Responsive design with mobile-first approach

## Deployment

The application can be deployed on any platform that supports Next.js:

1. **Vercel** (Recommended):
   - Push to GitHub
   - Connect repository to Vercel
   - Add environment variables
   - Deploy

2. **Other Platforms**:
   - Build the application: `npm run build`
   - Set environment variables
   - Start the server: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.