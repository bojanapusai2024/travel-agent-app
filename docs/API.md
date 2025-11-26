# API Documentation

## Overview

The Travel Agent API provides RESTful endpoints for managing travel planning, expense tracking, and team collaboration.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://api.travelagent.app/api`

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Authentication Endpoints

#### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

#### Refresh Token

```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

## Trips

### List Trips

```http
GET /api/v1/trips
Authorization: Bearer <token>
```

### Get Trip

```http
GET /api/v1/trips/:id
Authorization: Bearer <token>
```

### Create Trip

```http
POST /api/v1/trips
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Summer Europe Trip",
  "description": "Two weeks exploring Europe",
  "startDate": "2024-06-15",
  "endDate": "2024-06-30"
}
```

### Update Trip

```http
PUT /api/v1/trips/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Trip Name",
  "status": "confirmed"
}
```

### Delete Trip

```http
DELETE /api/v1/trips/:id
Authorization: Bearer <token>
```

## Expenses

### List Expenses

```http
GET /api/v1/expenses?tripId=<trip_id>
Authorization: Bearer <token>
```

### Get Expense

```http
GET /api/v1/expenses/:id
Authorization: Bearer <token>
```

### Create Expense

```http
POST /api/v1/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "tripId": "<trip_id>",
  "amount": 150.00,
  "currency": "USD",
  "category": "food",
  "description": "Team dinner"
}
```

### Update Expense

```http
PUT /api/v1/expenses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 175.00,
  "description": "Updated description"
}
```

### Delete Expense

```http
DELETE /api/v1/expenses/:id
Authorization: Bearer <token>
```

## Users

### Get Profile

```http
GET /api/v1/users/profile
Authorization: Bearer <token>
```

### Update Profile

```http
PUT /api/v1/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

### Update Preferences

```http
PUT /api/v1/users/preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "currency": "EUR",
  "timezone": "Europe/London",
  "theme": "dark"
}
```

## WebSocket Events

Connect to the WebSocket server at `ws://localhost:3000`.

### Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `trip:join` | Client → Server | Join a trip room |
| `trip:leave` | Client → Server | Leave a trip room |
| `location:update` | Client → Server | Send location update |
| `location:updated` | Server → Client | Receive location update |
| `expense:created` | Client → Server | Notify expense creation |
| `expense:new` | Server → Client | Receive new expense |
| `expense:updated` | Client → Server | Notify expense update |
| `expense:changed` | Server → Client | Receive expense change |
| `expense:deleted` | Client → Server | Notify expense deletion |
| `expense:removed` | Server → Client | Receive expense removal |

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | No valid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |

## Rate Limiting

API requests are limited to:
- 100 requests per 15 minutes for authenticated users
- 10 requests per 15 minutes for authentication endpoints

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Unix timestamp when the window resets
