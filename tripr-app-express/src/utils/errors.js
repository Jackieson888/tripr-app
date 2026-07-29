class NotFound extends Error {
  constructor (message = 'Not Found') {
    super(message)
    this.status = 404
  }
}

class Forbidden extends Error {
  constructor (message = 'Access Forbidden') {
    super(message)
    this.status = 403
  }
}

class UnAuthorized extends Error {
  constructor (message = 'Unauthorized') {
    super(message)
    this.status = 401
  }
}

class BadRequest extends Error {
  constructor (message = 'Bad Request') {
    super(message)
    this.status = 400
  }
}

class Unexpected extends Error {
  constructor (message = 'Unexpected Error') {
    super(message)
    this.status = 500
  }
}

module.exports = {
  NotFound,
  Forbidden,
  UnAuthorized,
  BadRequest,
  Unexpected
}
