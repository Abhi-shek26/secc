# replit.md

## Overview

This is an informational website for the 2026 Southeastern Regional Women's & Girls' Chess Championship. The site serves as a public-facing tournament information hub, providing details about registration, schedule, prizes, venue, hotel accommodations, policies, sponsors, and contact information. It's a frontend-focused application with a minimal backend that primarily serves the static React application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack Query for server state (minimal usage as this is primarily static content)
- **Typography**: Inter (headings/UI) and Georgia (body text) via Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express
- **Structure**: Minimal API server that primarily serves the static frontend
- **Storage Interface**: Abstract storage layer (`IStorage`) with in-memory implementation - designed to be swapped for database storage later
- **Database Schema**: Drizzle ORM with PostgreSQL schema defined (users table) but not actively used

### Design Patterns
- **Component Organization**: Feature-based page components with shared UI components in a dedicated directory
- **Layout System**: Consistent Layout wrapper with Navigation and Footer components
- **Constants Pattern**: Centralized tournament data in `lib/constants.ts` for easy content updates
- **Path Aliases**: `@/` for client source, `@shared/` for shared code between frontend and backend

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Vite builds static assets to `dist/public`, esbuild bundles server code to `dist/index.cjs`
- **Database Migrations**: Drizzle Kit for schema management (`db:push` command)

## External Dependencies

### Third-Party Services
- **Google Fonts**: Inter and Open Sans font families loaded via CDN
- **Google Maps**: Embedded iframe for venue location display

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema-first database toolkit with Zod validation integration

### Key NPM Packages
- **UI Framework**: Radix UI primitives (dialog, dropdown, tabs, etc.)
- **Form Handling**: React Hook Form with Zod resolvers
- **Date Utilities**: date-fns
- **Build Tools**: Vite, esbuild, tsx for TypeScript execution

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Development error overlay
- `@replit/vite-plugin-cartographer`: Development tooling (conditional)
- `@replit/vite-plugin-dev-banner`: Development environment indicator (conditional)