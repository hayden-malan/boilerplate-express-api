const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
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

function addUser (newUser, testDb) {
  const db = testDb || connection
  console.log(newUser)
  return db('users').insert(newUser)
}

function deleteUser (id, testDb) {
  const db = testDb || connection
  return db('users').where('id', id).del()
}

function updateUser (id, updateUser, testDb) {
  const db = testDb || connection
  return db('users').update(updateUser).where('id', id)
}
