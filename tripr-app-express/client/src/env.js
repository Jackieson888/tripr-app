export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = true
export const domain = 'dev-1xhecvp8hy0zjc8q.us.auth0.com'
export const clientId = 'omyZ2WBjJjeC6O5R6HErCHFwGdszXtar'
export const audience = 'https://tripr-api.com'
export const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
