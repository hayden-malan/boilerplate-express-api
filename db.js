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

function addUser (data, testDb) {
  const db = testDb || connection
  return db('users').insert({name: data.name, email:data.email})
}

function updateUser (id, data, testDb) {
  const db = testDb || connection
  return db('users')
  .where ('id',id)
  .first()
  .update ({name:data.name, email:data.email})
}
