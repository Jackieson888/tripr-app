const { Server } = require('socket.io')
const { logger } = require('../utils/logger')
const { AuthHandler } = require('../socket/handlers/AuthHandler')
const { AuthTestHandler } = require('../socket/handlers/AuthTestHandler')
const { TestHandler } = require('../socket/handlers/TestHandler')

/**
 * Socket.IO event names
 */
const SOCKET_EVENTS = {
  connection: 'connection',
  connected: 'connected',
  disconnect: 'disconnect',
  userConnected: 'userConnected',
  userDisconnected: 'userDisconnected',
  error: 'error'
}

/**
 * Socket.IO provider for managing real-time communication
 */
class SocketProvider {
  /**
   * @type {Server}
   */
  constructor () {
    this.io = null
  }

  /**
   * Initialize Socket.IO on HTTP server
   * @param {http.Server} httpServer - HTTP server instance
   */
  initialize (httpServer) {
    try {
      this.io = new Server(httpServer, {
        cors: {
          origin: process.env.NODE_ENV === 'dev' ? '*' : process.env.CLIENT_URL || ''
        }
      })

      this.io.on(SOCKET_EVENTS.connection, (socket) => this.onConnect(socket))
      logger.log('[SOCKET.IO INITIALIZED]')
    } catch (e) {
      logger.error('[SOCKETIO ERROR]', e)
    }
  }

  /**
   * Handle new socket connection
   * @param {Socket} socket - Socket instance
   */
  onConnect (socket) {
    this.attachHandlers(socket)
    socket.emit(SOCKET_EVENTS.connected, {
      socket: socket.id,
      message: 'Successfully Connected'
    })
  }

  /**
   * Attach all socket handlers to a new socket
   * @param {Socket} socket - Socket instance
   */
  attachHandlers (socket) {
    const handlers = [
      new AuthHandler(this.io, socket),
      new AuthTestHandler(this.io, socket),
      new TestHandler(this.io, socket)
    ]
    socket._handlers = handlers
  }

  /**
   * Send a direct message to a specific user
   * @param {string} userId - Target user ID
   * @param {string} eventName - Event name
   * @param {any} payload - Message payload
   */
  messageUser (userId, eventName, payload) {
    try {
      this.io.to(userId).emit(eventName, payload)
    } catch (e) {
      logger.error('[SOCKET_ERROR] messageUser', e, { userId, eventName, payload })
    }
  }

  /**
   * Send a message to all sockets in a room
   * @param {string} room - Room name
   * @param {string} eventName - Event name
   * @param {any} payload - Message payload
   */
  messageRoom (room, eventName, payload) {
    try {
      this.io.to(room).emit(eventName, payload)
    } catch (e) {
      logger.error('[SOCKET_ERROR] messageRoom', e, { room, eventName, payload })
    }
  }

  /**
   * Broadcast a message to all connected sockets
   * @param {string} eventName - Event name
   * @param {any} payload - Message payload
   */
  message (eventName, payload) {
    try {
      this.io.emit(eventName, payload)
    } catch (e) {
      logger.error('[SOCKET_ERROR] message', e, { eventName, payload })
    }
  }
}

// Create and export singleton instance
const socketProvider = new SocketProvider()

module.exports = {
  socketProvider,
  SocketProvider,
  SOCKET_EVENTS
}
