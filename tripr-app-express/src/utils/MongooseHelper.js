const { dbContext } = require('../models')

/**
 * Auto-populate schema fields on query
 * @param {import('mongoose').Schema<any>} schema
 * @param {string} populate
 */
function autoPopulate (schema, populate, select = 'name picture') {
  const populateEvents = ['findOne', 'find', 'findById']
  populateEvents.forEach(e => {
    schema.pre(e, include)
  })
  function include (next) {
    if (typeof populate === 'object') {
      this.populate(populate)
    } else {
      this.populate(populate, select)
    }
    next()
  }
}

/**
 * @typedef { Object } modelConstraints - Constraints for other models
 * @property { string } modelName - Name of the model with the constraint
 * @property { Array.<{foreignKey: string, localKey: String }> } [constraints] - Constraints with foreignKey and localKey
 * @property { Function } [constraint] - function based constraint,  overrides contraints array. localKey is required
 */

/**
 * Remove related items to prevent orphaned data
 * @param { import('mongoose').Schema<any> } schema
 * @param { modelConstraints[] } otherModels
 */
function cascadeDelete (schema, otherModels) {
  const removeEvents = ['findOneAndDelete', 'deleteMany', 'findOneAndRemove', 'findByIdAndDelete', 'findByIdAndRemove']
  removeEvents.forEach(e => {
    schema.post(e, cascade)
  })
  function cascade (doc, next) {
    doc = doc._doc
    otherModels.forEach(async m => {
      const model = dbContext[m.modelName]
      if (!model) { return }
      let documentQuery = {}
      if (Array.isArray(m.constraints)) {
        m.constraints.forEach(c => {
          documentQuery[c.foreignKey] = doc[c.localKey]
        })
      }
      if (typeof m.constraint === 'function') {
        documentQuery = m.constraint(doc)
      }
      await model.collection.deleteMany(documentQuery).exec()
    })
    next(null)
  }
}

module.exports = {
  autoPopulate,
  cascadeDelete
}
