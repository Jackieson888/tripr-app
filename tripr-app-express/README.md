# Tripr App - Express.js Backend

A modern Express.js backend for the Tripr trip planning application, featuring real-time Socket.IO communication, MongoDB with Mongoose, and Auth0 authentication.

## Features

- **Express.js** - Fast, minimalist web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.IO** - Real-time bidirectional communication
- **Auth0** - Secure authentication and authorization
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware for HTTP headers
- **Error Handling** - Comprehensive error handling with custom error classes
- **Modular Architecture** - Well-organized separation of concerns

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── auth.js          # Auth0 setup
│   ├── database.js      # MongoDB connection
│   └── environment.js   # Environment variables
├── controllers/         # Route handlers
│   ├── accountController.js
│   ├── profileController.js
│   ├── tripController.js
│   ├── travelerController.js
│   ├── supplyController.js
│   ├── trackedTripController.js
│   ├── routeDetailController.js
│   └── valueController.js
├── middleware/          # Express middleware
│   ├── auth.js          # Account validation
│   ├── cors.js          # CORS configuration
│   └── errorHandler.js  # Global error handling
├── models/              # Mongoose schemas
│   ├── Account.js
│   ├── Trip.js
│   ├── Traveler.js
│   ├── Supplies.js
│   ├── Value.js
│   ├── RouteDetail.js
│   ├── TrackedTrip.js
│   ├── TripMapSource.js
│   └── index.js         # Database context
├── routes/              # API routes
│   └── index.js         # Central route registration
├── services/            # Business logic
│   ├── AccountService.js
│   ├── ProfileService.js
│   ├── TripsService.js
│   ├── TravelersService.js
│   ├── SuppliesService.js
│   ├── TrackedTripService.js
│   ├── RouteDetailsService.js
│   └── ValuesService.js
├── socket/              # Socket.IO
│   ├── socketManager.js  # Socket.IO setup and management
│   └── handlers/         # Event handlers
│       ├── AuthHandler.js
│       ├── AuthTestHandler.js
│       └── TestHandler.js
├── utils/               # Utility functions
│   ├── logger.js         # Logging utility
│   ├── errors.js         # Custom error classes
│   ├── SocketHandler.js  # Base Socket handler
│   ├── AccountValidator.js # Account validation
│   └── MongooseHelper.js # Database helpers
├── constants/           # Constants
│   └── collections.js   # Collection names
├── app.js               # Express app configuration
├── server.js            # HTTP server setup
└── index.js             # Application entry point
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tripr-app-express
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - `NODE_ENV` - Set to 'dev' or 'production'
   - `PORT` - Server port (default: 3000)
   - `CONNECTION_STRING` - MongoDB connection string
   - `AUTH_DOMAIN` - Auth0 domain
   - `AUTH_CLIENT_ID` - Auth0 client ID
   - `AUTH_AUDIENCE` - Auth0 audience identifier
   - `CLIENT_URL` - Client application URL

## Running the Application

### Development Mode

```bash
npm run dev
```

This starts both servers with hot reload:

- Express API server (nodemon) on port 3001
- Vite client dev server (HMR) on port 3000

Open the app at `http://localhost:3000` during development.

### Production Mode

```bash
npm start
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## API Endpoints

### Account Routes

- `GET /api/account` - Get authenticated user account
- `PUT /api/account` - Update user profile
- `GET /api/account/trackedtrips` - Get user's tracked trips
- `DELETE /api/account/trackedtrips/:id` - Remove tracked trip

### Profiles

- `GET /api/profiles` - Search profiles by name
- `GET /api/profiles/:id` - Get profile by ID

### Trips

- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:tripId` - Get trip details
- `PUT /api/trips/:tripId` - Update trip
- `DELETE /api/trips/:tripId` - Delete trip

### Travelers

- `GET /api/trips/:tripId/travelers` - Get trip travelers
- `POST /api/trips/:tripId/travelers` - Add traveler to trip
- `GET /api/trips/:tripId/travelers/:id` - Get traveler details
- `DELETE /api/trips/:tripId/travelers/:id` - Remove traveler

### Supplies

- `GET /api/trips/:tripId/supplies` - Get trip supplies
- `POST /api/trips/:tripId/supplies` - Create supply item
- `GET /api/trips/:tripId/supplies/:id` - Get supply details
- `PUT /api/trips/:tripId/supplies/:id` - Update supply
- `DELETE /api/trips/:tripId/supplies/:id` - Delete supply

### Route Details

- `GET /api/trips/:tripId/routes` - Get route details
- `POST /api/trips/:tripId/routes` - Create route detail
- `GET /api/trips/:tripId/routes/:id` - Get route details
- `PUT /api/trips/:tripId/routes/:id` - Update route
- `DELETE /api/trips/:tripId/routes/:id` - Delete route

### Tracked Trips

- `POST /api/trackedtrips` - Join trip (create tracked trip)

### Values

- `GET /api/values` - Get all values
- `POST /api/values` - Create new value (authenticated)

## Socket.IO Events

### Client Events

- `authenticate` - Authenticate user with bearer token
- `SOCKET_TEST` - Test socket connection
- `AUTH_TEST` - Test authenticated socket connection

### Server Events

- `connected` - Emitted when socket connects
- `authenticated` - Emitted after successful authentication
- `userConnected` - Broadcast when user connects
- `userDisconnected` - Broadcast when user disconnects
- `error` - Error event

## Authentication

The application uses Auth0 for authentication. All protected routes require:

- A valid Bearer token in the Authorization header
- Token must include the user ID in the `id` claim
- Account is automatically created/updated on first request

## Error Handling

Custom error classes with status codes:

- `NotFound` (404) - Resource not found
- `Forbidden` (403) - Access denied
- `UnAuthorized` (401) - Authentication required
- `BadRequest` (400) - Invalid request
- `Unexpected` (500) - Server error

## Database

MongoDB schemas include:

- **Account** - User accounts with Auth0 subs
- **Profile** - Public user profile information
- **Trip** - Trip planning documents
- **Traveler** - Trip participant associations
- **Supplies** - Trip supply items
- **Value** - Trip values/principles
- **RouteDetail** - Trip route waypoints
- **TrackedTrip** - User's tracked trips

## Development Notes

- All services are singleton instances
- Controllers are function-based for modularity
- Socket handlers extend a base SocketHandler class
- Models use Mongoose virtuals for related data
- Error messages are caught by global error handler
- CORS is environment-aware (permissive in dev, restrictive in production)

## Contributing

1. Follow the existing code structure and patterns
2. Use descriptive commit messages
3. Test your changes before submitting
4. Keep the codebase clean and well-documented

## License

ISC
