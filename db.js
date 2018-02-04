const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser
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
  return db('users').insert({name: newUser.name, email: newUser.email})
}





function deleteUser (deleteUser, testDb) {
  const db = testDb || connection
  return db('users').delete({id:deleteUser.id, name: deleteUser.name, email: deleteUser.email}).where('id', deleteUser.id)
}

// function addUser (newUser, testDb) {
//   const db = testDb || connection
//   console.log(newUser)
//   return db('users').insert({name: newUser.name, email: newUser.email})
// }
