# Contributing Guidelines

Thank you for your interest in contributing to Travel Agent! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/travel-agent-app.git`
3. Set up development environment (see [SETUP.md](./SETUP.md))
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/add-expense-splitting` - New features
- `fix/trip-loading-error` - Bug fixes
- `docs/update-api-docs` - Documentation
- `refactor/simplify-auth-flow` - Code refactoring

### Commit Messages

Follow conventional commits format:

```
type(scope): short description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(expenses): add expense splitting functionality

fix(auth): resolve token refresh race condition

docs(api): add WebSocket event documentation
```

### Pull Request Process

1. Ensure your code passes linting: `pnpm lint`
2. Ensure all tests pass: `pnpm test`
3. Update documentation if needed
4. Create a pull request with a clear description
5. Link any related issues

## Code Style

### TypeScript

- Use TypeScript strict mode
- Avoid `any` type - use proper typing
- Use interfaces for object shapes
- Export types from dedicated type files

```typescript
// Good
interface User {
  id: string;
  email: string;
  name: string;
}

// Avoid
const user: any = fetchUser();
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
}) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};
```

### API Endpoints

- Use RESTful conventions
- Validate all input with Zod
- Return consistent response formats

```typescript
// Response format
{
  success: true,
  data: { ... }
}

// Error format
{
  success: false,
  error: {
    code: 'ERROR_CODE',
    message: 'Human readable message'
  }
}
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @travel-agent/api test
```

### Writing Tests

- Write tests for new features
- Update tests for bug fixes
- Aim for meaningful coverage, not 100%

## Documentation

- Update README.md for user-facing changes
- Update API.md for endpoint changes
- Add JSDoc comments for public functions

```typescript
/**
 * Calculate the split amount for an expense
 * @param total - Total expense amount
 * @param participants - Number of participants
 * @returns Array of split amounts
 */
export function splitExpense(total: number, participants: number): number[] {
  // implementation
}
```

## Project Structure

When adding new features:

1. **Types**: Add TypeScript interfaces in `packages/shared/src/types/`
2. **API Routes**: Add routes in `apps/api/src/routes/`
3. **Controllers**: Add controllers in `apps/api/src/controllers/`
4. **Services**: Add business logic in `apps/api/src/services/`
5. **UI Components**: Add components in `packages/ui/src/components/`
6. **Web Pages**: Add pages in `apps/web/src/pages/`
7. **Mobile Screens**: Add screens in `apps/mobile/src/screens/`

## Review Process

All submissions require review. We aim to:
- Review PRs within 48 hours
- Provide constructive feedback
- Merge approved PRs promptly

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
