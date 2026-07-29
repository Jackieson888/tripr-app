/**
 * Base class for Socket.IO event handlers
 * Provides consistent event registration and error handling for socket events
 */
class SocketHandler {
  /**
   * @param {import('socket.io').Server} io
   * @param {import('socket.io').Socket} socket
   * @param {boolean | function():boolean} requiresAuth
   */
  constructor (io, socket, requiresAuth = false) {
    this.io = io
    this.socket = socket
    this.user = null
    this.profile = null
    if (requiresAuth === true) {
      requiresAuth = () => this.user
    }
    this.requiresAuth = requiresAuth
  }

  /**
   * Register an event handler on the socket
   * @param {string} event - Event name to listen for
   * @param {Function} fn - Event handler function
   * @returns {this} For method chaining
   */
  on (event, fn) {
    this.socket.on(event, (payload) => {
      try {
        if (!this.requiresAuth) {
          return fn.call(this, payload)
        }
        if (!this.requiresAuth()) {
          return this.socket.emit('error', { message: 'Unauthorized' })
        }
        return fn.call(this, payload)
      } catch (e) {
        this.socket.emit('error', { message: e.message })
      }
    })
    return this
  }

  /**
   * Attach authenticated user and profile to handler
   * @param {Object} user - Auth0 user object
   * @param {Object} profile - User profile/account object
   */
  attachUser (user, profile) {
    this.user = user
    this.profile = profile
  }
}

module.exports = {
  SocketHandler
}
