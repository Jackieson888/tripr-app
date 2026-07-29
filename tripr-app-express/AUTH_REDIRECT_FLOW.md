# Authentication Redirect Flow - Account Page Navigation

## Overview
After a user successfully authenticates with Auth0, they are automatically redirected to the Account page where they can view and manage their trips.

## Authentication Flow

### 1. **Login Initiation** (LoginPage.vue)
- User clicks "Login" or "Signup" button
- `loginWithRedirect()` is called with Auth0 credentials
- User is redirected to Auth0 Universal Login page

### 2. **Auth0 Authentication**
- User enters credentials or signs up for new account
- Auth0 processes authentication
- User is redirected back to application callback URL (`http://localhost:3000/`)

### 3. **Authentication Detection** (LoginPage.vue)
A `watch()` function monitors `isAuthenticated.value` and triggers when authentication succeeds:

```javascript
watch(() => isAuthenticated.value, (auth) => {
  if (auth && user.value) {
    AppState.user = user.value
    getAccessTokenSilently().then((token) => {
      accountService.getAccount()
      socketService.authenticate(token)
      // Navigate to Account page after successful authentication
      router.push({ name: 'Account' })
    }).catch(err => console.error('Error getting token:', err))
  }
})
```

### 4. **Automatic Redirect to Account Page**
When authentication is confirmed:
1. User object is stored in AppState
2. JWT access token is silently retrieved
3. Account data is fetched from backend
4. Socket.io authentication is initialized
5. Router navigates to `/account` route (Account page)

### 5. **Account Page** (AccountPage.vue)
User lands on Account page with:
- ✅ Account info (name, profile picture, trip stats)
- ✅ "Create Trip" button (links to CreateTripPage)
- ✅ "Join Trip" button with modal form
- ✅ "Trips" button (links to YourTripsPage)
- ✅ Logout button (icon in top-right)

## Files Modified

### `client/src/pages/LoginPage.vue` (Lines 113-124)
```javascript
// Watch for authentication changes
watch(() => isAuthenticated.value, (auth) => {
  if (auth && user.value) {
    AppState.user = user.value
    getAccessTokenSilently().then((token) => {
      accountService.getAccount()
      socketService.authenticate(token)
      // Navigate to Account page after successful authentication
      router.push({ name: 'Account' })
    }).catch(err => console.error('Error getting token:', err))
  }
})
```

**Key Changes:**
- Added `import { watch }` from Vue for reactivity
- Changed from `.subscribe()` (RxJS - broken) to `watch()` (Vue - correct)
- Added `router.push({ name: 'Account' })` on line 121

### `client/src/router.js` (Line 84-88)
Account route already protected with `authGuard`:
```javascript
{
  path: '/account',
  name: 'Account',
  component: loadPage('AccountPage'),
  beforeEnter: authGuard  // Prevents unauthenticated access
}
```

## JWT Token Management

### Automatic Token Retrieval
- Token obtained via `getAccessTokenSilently()` after login
- Auth0 SDK automatically manages token refresh (before expiration)
- Token stored in memory (not localStorage) for security

### Token Injection in API Calls
Via axios interceptor in AuthService (line 60-73):
```javascript
async setupTokenInterceptor() {
  api.interceptors.request.use(async (config) => {
    if (!this.isAuthenticated) return config
    try {
      const token = await this.getTokenSilently()
      this.setBearer(token)
      config.headers.authorization = `Bearer ${token}`
    } catch (error) {
      console.error('Error getting token:', error)
    }
    return config
  })
}
```

All API requests to backend automatically include:
```
Authorization: Bearer <JWT_TOKEN>
```

## Socket.io Authentication

After token retrieval, Socket.io is authenticated:
```javascript
socketService.authenticate(token)
```

Enables real-time features:
- Trip updates
- User presence tracking
- Live notifications

## Logout Flow

### From Account Page
User clicks logout icon (top-right) → calls `AuthService.logout()`

```javascript
async logout(options = {}) {
  if (!this.auth0) await this.initializeAuth0()
  return await this.auth0.logout(options)
}
```

### Auth0 Logout
1. Session cleared at Auth0
2. Tokens invalidated
3. User redirected to logout URL (`http://localhost:3000/`)
4. Application state cleared (AppState.user = null)
5. Router redirects to LoginPage

## Error Handling

### Failed Authentication
- Token retrieval fails → error logged to console
- User remains on Login page
- Auth0 error displays (if applicable)
- User can retry login

### Protected Route Access
- Routes protected with `authGuard` (Trip, Account, YourTrips, CreateTrip)
- Unauthenticated users redirected to LoginPage
- Auth0 SDK handles loading state during initialization

## Testing the Flow

### Prerequisites
✅ Express backend running on http://localhost:3000
✅ MongoDB connected
✅ Auth0 credentials configured in .env.local
✅ Production build deployed to client/dist/

### Test Steps
1. Open http://localhost:3000
2. Click "Login" button
3. Enter Auth0 credentials or sign up
4. Should redirect to Account page (http://localhost:3000/#/account)
5. Verify:
   - User profile loads
   - Trips display
   - Logout button visible
6. Click Logout → redirects to Login page

### Network Inspection
DevTools (F12) → Network tab:
- Login request → Auth0 redirect
- GET /account → Account data
- All API calls include `Authorization: Bearer <token>` header

## Troubleshooting

### Issue: Stays on Login page after auth
**Solution:** Check browser console (F12) for errors related to:
- Token retrieval failure
- Route push failure
- AppState access

### Issue: Account page shows "Loading..."
**Solution:** Check:
- Is backend running? → `npm start` in tripr-app-express/
- Is MongoDB connected? Check console logs
- Is auth token valid? → Check Network tab for 401 errors

### Issue: Can't logout
**Solution:** 
- Clear browser cookies/cache
- Check auth0.logout() is called with correct returnTo URL
- Verify logout URL configured in Auth0 dashboard

## Config References

### Auth0 Configuration
- **Domain:** dev-1xhecvp8hy0zjc8q.us.auth0.com
- **Client ID:** omyZ2WBjJjeC6O5R6HErCHFwGdszXtar
- **Application Type:** SPA
- **Callback URL:** http://localhost:3000/
- **Logout URL:** http://localhost:3000/
- **Token Endpoint Auth Method:** none

### Environment Variables
**Frontend** (`client/.env.local`):
```
VITE_AUTH0_DOMAIN=dev-1xhecvp8hy0zjc8q.us.auth0.com
VITE_AUTH0_CLIENT_ID=omyZ2WBjJjeC6O5R6HErCHFwGdszXtar
PORT=3000
```

**Backend** (`tripr-app-express/.env`):
```
NODE_ENV=dev
PORT=3000
CONNECTION_STRING=mongodb+srv://...
AUTH_DOMAIN=dev-1xhecvp8hy0zjc8q.us.auth0.com
AUTH_CLIENT_ID=omyZ2WBjJjeC6O5R6HErCHFwGdszXtar
AUTH_AUDIENCE=...
```

## Next Steps

- [ ] Test complete authentication flow in browser
- [ ] Verify JWT tokens in API requests
- [ ] Test protected routes (should redirect if not authenticated)
- [ ] Test Socket.io real-time features
- [ ] Test logout and session clearing
- [ ] Prepare for production Auth0 application setup
