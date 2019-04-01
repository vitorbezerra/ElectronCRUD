const fs = require('fs')
let path = require('path')
const Sequelize = require('sequelize')
let sequelize = new Sequelize('sqlite:maindb.db', {
  operatorsAliases: false,
  logging: false,
})

let db = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file))
    if (model)
      db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db