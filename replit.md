# WEBCLUB Corporate Website

## Overview

WEBCLUB is a corporate website for an IT development company based in Russia. The site showcases services including e-commerce platforms, corporate websites, mobile applications (Android/iOS/Windows), and banking/government IT projects. Built as a modern single-page application with a contact form, AI chat widget, and voice chat powered by OpenAI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite with React plugin
- **3D Effects**: Three.js for animations
- **Motion**: Framer Motion for page transitions and animations

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: tsx for TypeScript execution, Vite dev server with HMR
- **Production**: esbuild bundles server code, Vite builds client to static files
- **AI Features**: OpenAI via Replit AI Integrations (no user API key needed)

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Chat Schema**: `shared/models/chat.ts` for conversations and messages
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Tables**: Users, ContactRequests, Conversations, Messages

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (sections, shadcn/ui, chat widget)
    pages/        # Route pages (home, not-found)
    hooks/        # Custom React hooks
    lib/          # Utilities (queryClient, utils)
  replit_integrations/
    audio/        # Voice chat client hooks (useVoiceRecorder, useVoiceStream, etc.)
server/           # Express backend
  index.ts        # Server entry point (port 5000)
  routes.ts       # API route definitions
  storage.ts      # Data access layer
  vite.ts         # Vite dev server integration
  replit_integrations/
    chat/         # AI chat SSE streaming routes + DB storage
    audio/        # Voice chat (STT + audio streaming) routes
    image/        # Image generation routes
    batch/        # Batch processing utilities
shared/           # Shared code between client/server
  schema.ts       # Database schema (users, contact requests)
  models/
    chat.ts       # Chat schema (conversations, messages)
```

### AI Features (via Replit AI Integrations)
- **Chat**: POST /api/chat — SSE streaming chat with OpenAI gpt-5.1
- **Voice Chat**: POST /api/conversations/:id/messages — SSE audio streaming (STT + gpt-audio)
- **Image Generation**: POST /api/generate-image — gpt-image-1 model
- **Conversations**: CRUD for /api/conversations (PostgreSQL persisted)

### Design System
- Typography: Inter/DM Sans font families
- Color system: Dark theme with purple accents
- Responsive: Mobile-first with Tailwind breakpoints
- Background: Matrix-style animated number rain effect

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection (managed by Replit)
- `AI_INTEGRATIONS_OPENAI_API_KEY` — Provisioned by Replit AI Integration (no user key needed)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` — Replit AI proxy base URL
- `SESSION_SECRET` — Express session secret

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations via `npm run db:push`

### UI Libraries
- **Radix UI**: Accessible component primitives
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
