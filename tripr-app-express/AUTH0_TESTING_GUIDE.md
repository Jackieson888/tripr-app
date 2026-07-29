# Auth0 Testing & Troubleshooting Guide

## 🚀 Quick Test Steps

### Step 1: Start the Application
```bash
cd C:\Users\jscha\tripr-app\tripr-app-express
npm start
```

Wait for message: `[SERVER STARTED] Listening on port 3000`

### Step 2: Open in Browser
```
http://localhost:3000
```

You should see the Tripr login page with:
- ✅ Tripr logo
- ✅ Login button
- ✅ Signup button  
- ✅ About button

### Step 3: Test Login
1. Click **Login** button
2. You'll be redirected to Auth0 Universal Login page
3. Enter your Auth0 credentials (or sign up with new account)
4. After authentication, you'll be redirected back to http://localhost:3000
5. Login page should now show **Logout** button

### Step 4: Test Protected Routes
1. While logged in, navigate to Account page: `http://localhost:3000/#/account`
2. Should load successfully
3. Log out and try again - should redirect to login

### Step 5: Verify API Calls Include Token
1. Login
2. Open Developer Tools (F12)
3. Go to Network tab
4. Navigate to a page that makes API calls
5. Click on API request in Network tab
6. Go to Request Headers section
7. Look for: `authorization: Bearer eyJhbGciOiJSUzI1NiI...`

---

## ✅ Expected Behavior

| Action | Expected Result |
|--------|-----------------|
| Click Login | Redirected to Auth0 login |
| Enter valid credentials | Redirected back with token |
| Access protected route logged in | Page loads successfully |
| Access protected route logged out | Redirected to login page |
| API call logged in | Request includes Authorization header |
| Click Logout | Redirected to login, session cleared |
| Refresh page while logged in | Stay logged in (token persisted) |

---

## 🔍 Debugging

### Check Auth State in Browser Console
```javascript
// After page loads
import { useAuth0 } from '@auth0/auth0-vue'
const auth = useAuth0()
console.log('Auth State:', {
  isAuthenticated: auth.isAuthenticated.value,
  user: auth.user.value,
  loading: auth.isLoading.value
})
```

### Check Token Value
```javascript
// After page loads
import { useAuth0 } from '@auth0/auth0-vue'
const { getAccessTokenSilently } = useAuth0()
getAccessTokenSilently().then(token => {
  console.log('Access Token:', token)
})
```

### Check Environment Variables
In browser console:
```javascript
console.log('Auth0 Domain:', import.meta.env.VITE_AUTH0_DOMAIN)
console.log('Auth0 Client ID:', import.meta.env.VITE_AUTH0_CLIENT_ID)
```

---

## ⚠️ Common Issues & Fixes

### Issue: "Invalid grant - Origin mismatch"
**Cause**: Application running on wrong port or domain
**Fix**: 
- Ensure port is 3000
- Check Auth0 app settings have `http://localhost:3000/` configured
- Restart server

### Issue: Login button does nothing
**Cause**: Auth0 plugin not initialized
**Fix**:
- Check `client/src/main.js` imports createAuth0
- Check `.env.local` has correct VITE_AUTH0_* variables
- Rebuild: `npm run build`

### Issue: Callback mismatch error
**Cause**: Port changed or Auth0 config doesn't match
**Fix**:
- Verify running on http://localhost:3000
- Check Auth0 Allowed Callback URLs includes `http://localhost:3000/`
- Restart application

### Issue: Token not in API requests
**Cause**: Axios interceptor not set up
**Fix**:
- Check `AuthService.js` has setupTokenInterceptor()
- Verify user is actually logged in
- Check browser console for errors

### Issue: Protected routes still accessible when logged out
**Cause**: Auth guard not working
**Fix**:
- Check `router.js` authGuard function is defined
- Verify routes have `beforeEnter: authGuard`
- Clear browser cache/cookies

### Issue: "Cannot read property 'value' of undefined" in console
**Cause**: useAuth0() not available yet or Auth0 plugin failed
**Fix**:
- Wait for page to fully load
- Check main.js Auth0 plugin registration
- Check browser console for startup errors

---

## 🧪 Manual Testing Scenarios

### Scenario 1: First-Time Login
1. Start fresh (no existing session)
2. Click Login
3. Sign up with new account
4. Should create account and log in automatically
5. Should redirect to Tripr app

### Scenario 2: Existing Account Login
1. Click Login with existing auth0 account
2. Should authenticate successfully
3. Should redirect back to app

### Scenario 3: Session Persistence
1. Login successfully
2. Refresh page (F5)
3. Should remain logged in
4. Token should still be valid

### Scenario 4: Logout & Cleanup
1. Login
2. Click Logout
3. Should redirect to login page
4. Session should be cleared
5. Trying to access protected route should show login page

### Scenario 5: Token Refresh
1. Login
2. Wait several minutes
3. Make an API call
4. Should automatically refresh token
5. API call should succeed

---

## 🔍 Network Request Inspection

### What to Look For

**Successful Login Request:**
- URL: `https://dev-1xhecvp8hy0zjc8q.us.auth0.com/oauth/token`
- Method: POST
- Status: 200
- Response: Contains `access_token`, `id_token`, `refresh_token`

**API Request with Token:**
- URL: `http://localhost:3000/api/*`
- Headers include: `authorization: Bearer eyJ...`
- Status: 200-201 (success) or 401 (token expired/invalid)

**Token Refresh:**
- URL: `https://dev-1xhecvp8hy0zjc8q.us.auth0.com/oauth/token`
- Method: POST
- Status: 200

---

## 📊 Browser DevTools Tips

### Application Tab
1. Open DevTools (F12)
2. Go to Application tab
3. Look for:
   - **Local Storage**: May contain auth0 keys
   - **Session Storage**: May contain auth0 keys
   - **Cookies**: Check for auth0 session cookie

### Network Tab
1. Open Network tab
2. Filter: `api` (shows API requests)
3. Filter: `auth0` (shows Auth0 requests)
4. Click any request to inspect:
   - Request URL
   - Request Headers (look for Authorization)
   - Response Status
   - Response Data

### Console Tab
1. Open Console (F12)
2. Run the JavaScript commands above
3. Look for error messages
4. Check for warnings

---

## ✨ Performance Tips

### Faster Testing
```bash
# Terminal 1: Keep backend running
cd C:\Users\jscha\tripr-app\tripr-app-express
npm start

# Terminal 2: Only rebuild when frontend files change
cd C:\Users\jscha\tripr-app\tripr-app-express\client
npm run build
```

### Hot Reload Development
```bash
# Terminal 2 (alternate): Use dev server for hot reload
cd C:\Users\jscha\tripr-app\tripr-app-express\client
npm run serve
# Then access at http://localhost:3000 (serves on your configured port)
```

---

## 📝 Test Checklist

- [ ] Server starts without errors
- [ ] Page loads at http://localhost:3000
- [ ] Login button is clickable
- [ ] Login redirects to Auth0
- [ ] Can enter credentials
- [ ] Redirects back after login
- [ ] Logout button appears when logged in
- [ ] Protected routes work when logged in
- [ ] Protected routes redirect when logged out
- [ ] API requests include token
- [ ] User profile loads correctly
- [ ] Socket.io connects (check console)
- [ ] Can logout successfully
- [ ] Can login again after logout

---

## 🆘 Getting Help

### Check Logs
1. **Backend Logs**: Terminal where `npm start` is running
2. **Browser Console**: F12 > Console tab
3. **Network Requests**: F12 > Network tab

### Common Log Messages
- `[SERVER STARTED]` - Backend ready
- `[SOCKET.IO INITIALIZED]` - Sockets working
- `[DATABASE CONNECTED]` - DB connection OK
- Auth0 errors usually appear in browser console

### Verify Configuration
```bash
# Check environment variables are loaded
cd C:\Users\jscha\tripr-app\tripr-app-express\client
cat .env.local

# Check Auth0 settings in browser
# Open DevTools > Console and run:
# console.log(import.meta.env.VITE_AUTH0_DOMAIN)
```

---

## 🎯 Success Indicators

✅ **Login works** - Can authenticate with Auth0
✅ **Protected routes work** - Can access account/trips when logged in
✅ **Tokens in headers** - Authorization header on API calls
✅ **Logout works** - Can clear session and login again
✅ **No errors in console** - Clean browser console (warnings OK)
✅ **User data displays** - User profile loads after login

---

## 📞 Support Resources

- [Auth0 Vue SDK Documentation](https://auth0.com/docs/quickstart/spa/vue)
- [Auth0 Vue Sample App](https://github.com/auth0-samples/auth0-vue-samples)
- [Common Auth0 Issues](https://auth0.com/docs/troubleshoot)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

---

**Ready to test? Start with "Quick Test Steps" above!** 🚀
