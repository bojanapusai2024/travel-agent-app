# Travel Agent

A comprehensive, real-time travel planning and budget management platform.

[![CI](https://github.com/bojanapusai2024/travel-agent-app/actions/workflows/ci.yml/badge.svg)](https://github.com/bojanapusai2024/travel-agent-app/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **Trip Planning**: Create and manage trips with detailed itineraries
- **Team Collaboration**: Organize team members into departments with role-based access
- **Expense Tracking**: Track expenses with category-based budgeting and splitting
- **Real-time Location Sharing**: Share live locations with trip members
- **Budget Management**: Set budgets, track spending, and manage repayments
- **Luggage Tracking**: Digital packing lists with status tracking
- **Multi-platform**: Web and mobile applications with shared codebase
- **Real-time Updates**: Socket.io for instant synchronization

## 🛠️ Tech Stack

### Frontend Web
- React 18 + TypeScript
- Vite
- React Router
- Zustand (state management)
- Axios

### Frontend Mobile
- React Native
- Expo
- React Navigation
- Zustand

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- Redis
- Socket.io
- Zod (validation)
- JWT Authentication

## 📦 Project Structure

```
travel-agent-app/
├── apps/
│   ├── web/                # React web application
│   ├── mobile/             # React Native mobile app
│   └── api/                # Node.js + Express backend
├── packages/
│   ├── shared/             # Shared types, constants, utilities
│   ├── ui/                 # Shared UI components
│   └── config/             # Shared configurations
├── database/
│   ├── schema.sql          # PostgreSQL schema
│   ├── migrations/         # Database migrations
│   └── seeds/              # Seed data
├── docs/                   # Documentation
└── .github/workflows/      # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker (for local database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bojanapusai2024/travel-agent-app.git
   cd travel-agent-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start local services (PostgreSQL & Redis)**
   ```bash
   docker-compose up -d
   ```

5. **Start development servers**
   ```bash
   # Start all apps
   pnpm dev

   # Or start individually
   pnpm dev:web    # Web app at http://localhost:5173
   pnpm dev:api    # API at http://localhost:3000
   pnpm dev:mobile # Mobile app with Expo
   ```

## 📜 Available Scripts

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

## 🎨 Theming

The UI uses a GitHub-inspired color scheme with support for dark and light modes:

### Dark Mode
- Background: `#0d1117` / `#161b22`
- Text: `#c9d1d9` / `#8b949e`
- Accent: `#1f6feb`

### Light Mode
- Background: `#ffffff` / `#f6f8fa`
- Text: `#24292f` / `#57606a`
- Accent: `#0969da`

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Setup Guide](./docs/SETUP.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)

## 🔧 Environment Variables

See [.env.example](./.env.example) for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret

## 🐳 Docker

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./docs/CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub Primer](https://primer.style/) for the color scheme inspiration
- [Expo](https://expo.dev/) for the amazing React Native tooling
- [Vite](https://vitejs.dev/) for the blazing fast build tool
