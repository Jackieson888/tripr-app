const { dbContext } = require('../models')
const { BadRequest } = require('../utils/errors')

class ValuesService {
  async find (query = {}) {
    const values = await dbContext.Values.find(query)
    return values
  }

  async findById (id) {
    const value = await dbContext.Values.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }
}

const valuesService = new ValuesService()

module.exports = {
  valuesService,
  ValuesService
}
