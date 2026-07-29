# Quick Start Guide - Tripr Express + Vue

## 🚀 Start the Application

### Option 1: Production Mode (Recommended)
```bash
cd C:\Users\jscha\tripr-app\tripr-app-express
npm start
```
- Backend runs on: http://localhost:3000
- Frontend is served from Express
- Optimized build being used

### Option 2: Development Mode with Hot Reload
**Terminal 1: Start Backend**
```bash
cd C:\Users\jscha\tripr-app\tripr-app-express
npm start
```

**Terminal 2: Start Frontend Dev Server**
```bash
cd C:\Users\jscha\tripr-app\tripr-app-express\client
npm run serve
```
- Backend API: http://localhost:3000/api
- Frontend dev server: http://localhost:8080 (with hot reload)

---

## 📌 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Vue Frontend** | http://localhost:3000 | Access the application (production) |
| **Vue Dev Server** | http://localhost:8080 | Dev with hot reload |
| **Backend API** | http://localhost:3000/api | REST API endpoints |
| **Socket.io** | http://localhost:3000 | Real-time communication |

---

## ✅ Verification

### 1. Backend Running
```bash
# Look for this log message:
# [SERVER STARTED] Listening on port 3000
```

### 2. Frontend Accessible
```bash
# Open browser and visit:
# http://localhost:3000
```

### 3. API Working
```bash
# API endpoints should respond:
# http://localhost:3000/api/accounts
```

---

## 🔐 Important Configuration

### Backend (.env)
Located at: `tripr-app-express/.env`

Required environment variables:
```env
NODE_ENV=dev
PORT=3000
CONNECTION_STRING=mongodb+srv://username:password@...
AUTH_DOMAIN=dev-1xhecvp8hy0zjc8q.us.auth0.com
AUTH_CLIENT_ID=omyZ2WBjJjeC6O5R6HErCHFwGdszXtar
AUTH_AUDIENCE=https://tripr-api.com
CLIENT_URL=http://localhost:8080
```

### Frontend Configuration
Located at: `tripr-app-express/client/src/env.js`

```javascript
export const baseURL = 'http://localhost:3000'
export const useSockets = true
export const domain = 'dev-1xhecvp8hy0zjc8q.us.auth0.com'
export const clientId = 'omyZ2WBjJjeC6O5R6HErCHFwGdszXtar'
export const audience = 'https://tripr-api.com'
```

---

## 🛠️ Useful Commands

### Backend Commands
```bash
cd C:\Users\jscha\tripr-app\tripr-app-express

npm start            # Production server
npm install          # Install dependencies
npm run build        # (if build script exists)
```

### Frontend Commands
```bash
cd C:\Users\jscha\tripr-app\tripr-app-express\client

npm run serve        # Development server
npm run build        # Build for production
npm run lint         # Check code quality
npm install          # Install dependencies
```

---

## 🔧 Port Cleanup

If port 3000 is already in use, kill the process:

```bash
# Find and kill process on port 3000
netstat -aon | findstr ":3000"
taskkill /PID <process_id> /F
```

---

## 🎯 Testing Checklist

- [ ] Backend starts without errors
- [ ] Visit http://localhost:3000 in browser
- [ ] See Tripr login page
- [ ] Click login and Auth0 modal appears
- [ ] Can navigate to different pages
- [ ] Real-time features work (Socket.io)
- [ ] API calls succeed with auth token

---

## 📁 Important Directories

| Path | Purpose |
|------|---------|
| `tripr-app-express/src` | Express backend code |
| `tripr-app-express/client` | Vue frontend source |
| `tripr-app-express/client/dist` | Built frontend (production) |
| `tripr-app-express/.env` | Backend configuration |
| `tripr-app-express/client/src/env.js` | Frontend configuration |

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process
netstat -aon | findstr ":3000"
taskkill /PID <PID> /F
```

### MongoDB Connection Issues
- Check CONNECTION_STRING in `.env`
- Ensure MongoDB credentials are correct
- Verify network/IP whitelist on MongoDB Atlas

### Frontend Not Loading
- Check `client/dist` exists (run `npm run build` from client folder)
- Verify Express is serving from correct path
- Check browser console for errors

### API Calls Failing
- Ensure Auth0 token is valid
- Check CORS configuration in `src/middleware/cors.js`
- Verify API endpoints exist on backend

---

## 📞 Key Contacts

- **Frontend Framework**: Vue 3
- **Frontend Build Tool**: Vite
- **Backend Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Auth0
- **Real-time**: Socket.io

---

**Status**: ✅ **READY TO USE**

Your complete Tripr application is set up and ready for development and testing!
