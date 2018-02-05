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
  var newUser = req.body.user

  db.addUser(newUser)
    .then( (userIds) => {
      res.json({id: userIds[0]})
    })
    .catch( err => {
      console.error(err.message)
      res.status(500).send("Couldn't insert a new user.")
    })
})


//request
router.delete('/:id', function (req, res) {
  var id = Number(req.params.id)

//mock
  db.deleteUser(id)
  .then(users => {
    res.json({yayMessage: "You sucessfully deleted the user"})
  })
    .catch( err => {
      console.error(err.message)
      res.status(500).send("Couldn't delete this user.")
    })
})



router.put('/:id', function (req, res) {
  var updateUser = req.body.user
    var id = Number(req.params.id)
  db.updateUser(id, updateUser)
  .then(users => {
    db.getUser(id)
      .then(user => res.json({user})
      )
  })
    .catch( err => {
      console.error(err.message)
      res.status(500).send("Couldn't update this user.")
    })
})





module.exports = router
