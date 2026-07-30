import { useAuth0 } from '@auth0/auth0-vue'
import { AppState } from '../AppState'
import { api } from './AxiosService'

// Create a wrapper to handle Auth0 operations
export class AuthServiceWrapper {
  constructor() {
    this.auth0 = null
    this.bearer = null
    this.user = null
    this.isAuthenticated = false
    this.identity = null
    this.interceptorId = null
  }

  async initializeAuth0() {
    this.auth0 = useAuth0()
  }

  async getTokenSilently() {
    if (!this.auth0) await this.initializeAuth0()
    return await this.auth0.getAccessTokenSilently()
  }

  async loginWithRedirect(options = {}) {
    if (!this.auth0) await this.initializeAuth0()
    return await this.auth0.loginWithRedirect(options)
  }

  async loginWithPopup(options = {}) {
    if (!this.auth0) await this.initializeAuth0()
    return await this.auth0.loginWithPopup(options)
  }

  async logout(options = {}) {
    if (!this.auth0) await this.initializeAuth0()
    return await this.auth0.logout(options)
  }

  setUser(user) {
    this.user = user
    AppState.user = user
  }

  setBearer(token) {
    this.bearer = token
    if (token) {
      api.defaults.headers.common = api.defaults.headers.common || {}
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      api.defaults.headers.common.authorization = `Bearer ${token}`
      api.defaults.headers.authorization = `Bearer ${token}`
    }
  }

  clearBearer() {
    this.bearer = null
    if (api.defaults.headers.common) {
      delete api.defaults.headers.common.Authorization
      delete api.defaults.headers.common.authorization
    }
    delete api.defaults.headers.authorization
  }

  setAuthenticated(value) {
    this.isAuthenticated = value
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }

  async setupTokenInterceptor() {
    if (this.interceptorId !== null) {
      return
    }

    api.interceptors.request.use(async(config) => {
      if (!this.isAuthenticated) return config

      try {
        const token = this.bearer || (await this.getTokenSilently())
        this.setBearer(token)
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
        config.headers.authorization = `Bearer ${token}`
      } catch (error) {
        return Promise.reject(error)
      }
      return config
    })
    this.interceptorId = true
  }
}

export const AuthService = new AuthServiceWrapper()
