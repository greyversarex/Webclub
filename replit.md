# WEBCLUB Corporate Website

## Overview

WEBCLUB is a corporate website for an IT development company based in Russia. The site showcases services including e-commerce platforms, corporate websites, mobile applications (Android/iOS/Windows), and banking/government IT projects. Built as a modern single-page application with a contact form system for lead generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: tsx for TypeScript execution, Vite dev server with HMR
- **Production**: esbuild bundles server code, Vite builds client to static files

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: MemStorage class (in-memory) with interface for database migration
- **Tables**: Users (authentication ready), ContactRequests (lead capture)

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (sections, shadcn/ui)
    pages/        # Route pages (home, not-found)
    hooks/        # Custom React hooks
    lib/          # Utilities (queryClient, utils)
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Data access layer
  vite.ts         # Vite dev server integration
shared/           # Shared code between client/server
  schema.ts       # Database schema definitions
```

### Design System
- Typography: Inter/DM Sans font families
- Color system: HSL-based CSS variables with semantic naming
- Responsive: Mobile-first with Tailwind breakpoints
- Theme: Light/dark mode toggle with localStorage persistence

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations via `npm run db:push`

### UI Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, toast, etc.)
- **Lucide React**: Icon library
- **React Icons**: Additional icons (social media brands)
- **Embla Carousel**: Carousel/slider functionality

### Development Tools
- **Vite**: Development server and build tool
- **Replit Plugins**: Cartographer, dev banner, runtime error overlay for Replit environment

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **zod-validation-error**: User-friendly validation error messages