# Development Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Docker** and **Docker Compose** (for local database)
- **Git**

### Installing pnpm

```bash
npm install -g pnpm
```

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/travel-agent-app.git
cd travel-agent-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration. For local development, the defaults should work with Docker.

### 4. Start Local Services

Start PostgreSQL and Redis using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port `5432`
- Redis on port `6379`

### 5. Initialize Database

```bash
# Apply schema
docker exec -i travel-agent-postgres psql -U travel_user -d travel_agent < database/schema.sql

# Run migrations (when implemented)
pnpm db:migrate

# Seed data (when implemented)
pnpm db:seed
```

### 6. Start Development Servers

```bash
# Start all apps
pnpm dev

# Or start individual apps
pnpm dev:web   # Web app at http://localhost:5173
pnpm dev:api   # API at http://localhost:3000
pnpm dev:mobile # Mobile app with Expo
```

## Project Structure

```
travel-agent-app/
├── apps/
│   ├── web/          # React web app
│   ├── mobile/       # React Native app
│   └── api/          # Express API server
├── packages/
│   ├── shared/       # Shared types & utilities
│   ├── ui/           # UI component library
│   └── config/       # Shared configurations
├── database/
│   ├── schema.sql    # Database schema
│   ├── migrations/   # SQL migrations
│   └── seeds/        # Seed data
└── docs/             # Documentation
```

## Available Scripts

### Root Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm dev:web` | Start web app only |
| `pnpm dev:mobile` | Start mobile app only |
| `pnpm dev:api` | Start API server only |
| `pnpm build` | Build all packages |
| `pnpm lint` | Run ESLint on all packages |
| `pnpm test` | Run tests |
| `pnpm clean` | Clean all node_modules and build artifacts |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:seed` | Seed the database |

## Web App Development

The web app uses Vite for fast development:

```bash
cd apps/web
pnpm dev
```

Access the app at `http://localhost:5173`

### Building for Production

```bash
pnpm build:web
```

## Mobile App Development

The mobile app uses Expo:

```bash
cd apps/mobile
pnpm start
```

Scan the QR code with Expo Go (iOS/Android) or press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

## API Development

The API server uses tsx for hot reloading:

```bash
cd apps/api
pnpm dev
```

API available at `http://localhost:3000`

### Testing API Endpoints

```bash
# Health check
curl http://localhost:3000/health

# API info
curl http://localhost:3000/api

# Register user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User"}'
```

## Environment Variables

Key environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | API server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | See `.env.example` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_REFRESH_SECRET` | Refresh token secret | (required) |

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Access PostgreSQL
docker exec -it travel-agent-postgres psql -U travel_user -d travel_agent

# Access Redis CLI
docker exec -it travel-agent-redis redis-cli
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues

Ensure Docker containers are running:
```bash
docker-compose ps
```

Reset database:
```bash
docker-compose down -v
docker-compose up -d
```

### Node Modules Issues

Clean install:
```bash
pnpm clean
pnpm install
```

### TypeScript Errors

Rebuild packages:
```bash
pnpm -r build
```

## IDE Setup

### VS Code Extensions

Recommended extensions:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense (if using Tailwind)

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Next Steps

1. Review the [API Documentation](./API.md)
2. Understand the [Architecture](./ARCHITECTURE.md)
3. Read the [Contributing Guidelines](./CONTRIBUTING.md)
