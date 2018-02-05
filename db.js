const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser
}

function getUsers (testDb) {
  const db = testDb || connection
  return db('users').select()
}

function getUser (id, testDb) {
  const db = testDb || connection
  return db('users').where('id', id).first()
}

function addUser (name, email, testDb) {
  const db = testDb || connection
  var newUser = {name :name, email: email}
  return db('users').insert(newUser)
}

function updateUser (id, userDetails, testDb) {
  const db = testDb || connection
  //var updateUser = {name: name, email: email}
  return db('users').update(userDetails).where('id', id)
}
