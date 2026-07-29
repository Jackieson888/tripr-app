# Mapbox Token Management - Setup & Troubleshooting

## Current Setup (✅ Secure)

### Files Involved

- **`.env.local`** - Token storage (NOT committed to git)
- **`client/src/env.js`** - Token loader
- **`MapService.js` & `MapService2.js`** - Token consumers

### How It Works

1. **Build Time (Vite):**
   - Vite reads `.env.local`
   - Replaces `import.meta.env.VITE_MAPBOX_ACCESS_TOKEN` with actual token value
   - Token embedded in final production bundle (one-way)

2. **Runtime:**
   - `env.js` exports: `export const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN`
   - `MapService.js` imports: `import { mapboxToken } from '../env'`
   - Sets: `mapboxgl.accessToken = mapboxToken`

### Environment Variable Rules

**MUST use `VITE_` prefix in `.env.local`:**

```bash
# ✅ Correct
VITE_MAPBOX_ACCESS_TOKEN=...

# ❌ Wrong
MAPBOX_ACCESS_TOKEN=...
REACT_APP_MAPBOX_TOKEN=...  # (CRA syntax, not Vite)
```

**Why `VITE_` prefix?** Vite only exposes variables with this prefix in `import.meta.env` for security.

## Token Security Best Practices

### ✅ DO

- Store token in `.env.local` only
- Use `VITE_` prefix for Vite builds
- Access via `import.meta.env.VITE_MAPBOX_ACCESS_TOKEN` in components
- Keep `.env.local` in `.gitignore` (DO NOT COMMIT)
- Regenerate token if accidentally committed
- Use public token for frontend (no restrictions needed)
- Restrict token to specific domains in Mapbox Dashboard

### ❌ DON'T

- Hardcode token in source files
- Commit `.env.local` to git
- Use `process.env.VITE_*` (use `import.meta.env` instead)
- Mix `process.env` and `import.meta.env`
- Trust tokens in older `.env` files without VITE\_ prefix
- Use server tokens (sk\_\*) in frontend code
- Commit production tokens - regenerate after deployment

## Setup Checklist

- [x] `.env.local` created with `VITE_MAPBOX_ACCESS_TOKEN`
- [x] `.env.local` added to `.gitignore`
- [x] `env.js` imports from `import.meta.env`
- [x] `MapService.js` imports token from `env.js`
- [x] `MapService2.js` imports token from `env.js`
- [x] Build tested and successful
- [x] Maps load correctly in dev mode
- [x] No hardcoded tokens in source files

## Troubleshooting

### Issue: "Cannot read property 'accessToken' of undefined"

**Cause:** Token not loaded before creating map
**Fix:**

```javascript
// Make sure this runs BEFORE creating map
mapboxgl.accessToken = mapboxToken
const map = new mapboxgl.Map({ ... })
```

### Issue: Map won't load, console shows 401/403 errors

**Cause:** Invalid or expired token
**Fix:**

1. Check `.env.local` has correct token
2. Regenerate token in Mapbox Dashboard if needed
3. Verify token has appropriate permissions
4. Clear browser cache and rebuild: `npm run build`

### Issue: "Token must be a string" error

**Cause:** `import.meta.env.VITE_MAPBOX_ACCESS_TOKEN` is undefined
**Fix:**

1. Check `.env.local` exists in project root
2. Verify format: `VITE_MAPBOX_ACCESS_TOKEN=pk.ey...`
3. Rebuild: `npm run build` (Vite needs rebuild to inject env vars)
4. Restart dev server if using `npm run serve`

### Issue: Environment variable is `undefined` in console

**Cause:**

- Variable not prefixed with `VITE_`
- `.env.local` not reloaded (dev server needs restart)
- Accessing wrong variable name

**Fix:**

1. Check `.env.local` for `VITE_` prefix
2. Restart dev server: `npm run serve`
3. Check import: `import.meta.env.VITE_MAPBOX_ACCESS_TOKEN` (exact name)

### Issue: Different token values in dev vs production

**Cause:** `.env.local` (dev) vs `.env` (production) mismatch
**Fix:**

- Development: Use `.env.local` (contains personal token)
- Production: Set environment variable at deploy time or use CI/CD secrets

## File References

**See code in:**

- Token loading: `client/src/env.js` line 7
- Token usage: `client/src/services/MapService.js` line 24
- Token usage: `client/src/services/MapService2.js` line 17
- Component config: `client/src/components/MapBox.vue`
- Component config: `client/src/components/TripMapBox.vue`

## Production Deployment

### Recommended Approach

1. **Use environment management:**
   - AWS Secrets Manager / Azure Key Vault
   - GitHub Secrets + GitHub Actions
   - Vercel Environment Variables
   - Firebase Environment Config

2. **Set at deploy time:**

   ```bash
   # Example with GitHub Actions
   - name: Build
     run: npm run build
     env:
      VITE_MAPBOX_ACCESS_TOKEN: ${{ secrets.MAPBOX_TOKEN }}
   ```

3. **Verify token in production:**
   - Token should NOT appear in JavaScript source
   - Token inlined only during build
   - Check network tab - should only see map requests to `api.mapbox.com`

## Additional Resources

- Vite Docs: https://vitejs.dev/guide/env-and-modes.html
- Mapbox Tokens: https://docs.mapbox.com/accounts/tokens/
- Mapbox Token Types: https://docs.mapbox.com/accounts/tokens/how-tokens-work/
