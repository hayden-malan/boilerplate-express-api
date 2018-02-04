const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.json({users: users})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id)
    .then(user => {
      res.json({user: user})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/', function (req, res) {
  var newUser = {
    name:  req.body.user.name,
    email: req.body.user.email
  }

  db.addUser(newUser)
    .then( (userIds) => {
      res.json({id: userIds[0]})
    })
    .catch( err => {
      console.error(err.message)
      res.status(500).send("Couldn't insert a new user.")
    })
})



router.delete('/:id', function (req, res) {
  var deleteUser = {
    id: req.params.id,
  }

  db.deleteUser(deleteUser)
  .then(users => {
    res.json({yayMessage: "You sucessfully deleted the user"})
  })
    .catch( err => {
      console.error(err.message)
      res.status(500).send("Couldn't delete this user.")
    })
})





module.exports = router
