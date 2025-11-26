# Architecture Overview

## System Architecture

Travel Agent is built as a monorepo containing three main applications:

1. **Web Application** (`apps/web`) - React + TypeScript + Vite
2. **Mobile Application** (`apps/mobile`) - React Native + Expo
3. **Backend API** (`apps/api`) - Node.js + Express + TypeScript

## High-Level Architecture

```
┌──────────────┐     ┌──────────────┐
│   Web App    │     │  Mobile App  │
│   (React)    │     │(React Native)│
└──────┬───────┘     └──────┬───────┘
       │                    │
       │    REST/WebSocket  │
       └────────┬───────────┘
                │
        ┌───────▼───────┐
        │   API Server  │
        │   (Express)   │
        └───────┬───────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐   ┌───▼───┐   ┌───▼───┐
│Postgres│   │ Redis │   │Socket │
│  DB    │   │ Cache │   │  .io  │
└────────┘   └───────┘   └───────┘
```

## Package Structure

### Shared Packages

- **`packages/shared`**: Common TypeScript types, constants, and utility functions shared across all apps
- **`packages/ui`**: React UI component library with GitHub-themed styling
- **`packages/config`**: Shared ESLint and TypeScript configurations

### Applications

#### Web Application (`apps/web`)

```
apps/web/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Route pages
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API client services
│   ├── store/         # Zustand state management
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   └── styles/        # Global CSS styles
├── public/            # Static assets
├── vite.config.ts     # Vite configuration
└── tsconfig.json      # TypeScript configuration
```

#### Mobile Application (`apps/mobile`)

```
apps/mobile/
├── src/
│   ├── components/    # React Native components
│   ├── screens/       # Screen components
│   ├── navigation/    # React Navigation setup
│   ├── hooks/         # Custom hooks
│   ├── services/      # API client services
│   ├── store/         # Zustand state management
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript types
├── app.json           # Expo configuration
├── App.tsx            # Root component
└── tsconfig.json      # TypeScript configuration
```

#### Backend API (`apps/api`)

```
apps/api/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Express middleware
│   ├── models/        # Database models
│   ├── routes/        # API route definitions
│   ├── services/      # Business logic
│   ├── sockets/       # Socket.io handlers
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   ├── validators/    # Request validators (Zod)
│   └── app.ts         # Express app entry
└── tsconfig.json      # TypeScript configuration
```

## Data Flow

### REST API Request Flow

```
Client Request
    │
    ▼
Express Router
    │
    ▼
Validation Middleware (Zod)
    │
    ▼
Authentication Middleware (JWT)
    │
    ▼
Controller
    │
    ▼
Service (Business Logic)
    │
    ▼
Database/Cache
    │
    ▼
Response
```

### Real-time Updates (Socket.io)

```
Client Event
    │
    ▼
Socket.io Server
    │
    ├─► Validate Event
    │
    ├─► Process Event
    │
    └─► Broadcast to Room
            │
            ▼
        Other Clients
```

## Database Schema

The PostgreSQL database is organized into these main areas:

1. **Users & Authentication**: User accounts, sessions, preferences, subscriptions
2. **Trips**: Trip details, members, departments, team assignments
3. **Locations & Travel**: Destinations, travel segments, accommodations
4. **Budget & Expenses**: Budgets, expenses, splits, repayments
5. **Location Tracking**: Real-time location updates, sharing settings
6. **Luggage**: Packing lists and items

## Caching Strategy

Redis is used for:
- Session storage
- Rate limiting
- Real-time presence tracking
- Temporary data caching

## Security

- JWT-based authentication with refresh tokens
- HTTPS encryption in production
- CORS configuration
- Helmet.js security headers
- Input validation with Zod
- SQL injection prevention with parameterized queries
- Rate limiting per user/IP

## Deployment

```
┌─────────────────────────────────────────┐
│              Load Balancer              │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐   ┌─────▼────┐   ┌────▼───┐
│Web CDN│   │API Server│   │API     │
│(Vercel│   │(Node.js) │   │Server  │
│Netlify│   │          │   │(Scale) │
└───────┘   └─────┬────┘   └────┬───┘
                  │             │
            ┌─────┴─────────────┘
            │
    ┌───────┴───────┐
    │   Database    │
    │  (PostgreSQL) │
    └───────────────┘
```

## Performance Considerations

- Server-side pagination for large datasets
- Lazy loading for UI components
- Image optimization
- Database connection pooling
- Redis caching for frequently accessed data
- WebSocket for real-time updates (vs polling)
