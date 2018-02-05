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

router.post('/addUser', (req, res) => {
  console.log('req.body', req.body)
  let name = req.body.user.name
  let email = req.body.user.email
  db.addUser(name, email)
    .then(userIds => {
      res.json({ userIds: {id: userIds[0]}
    })
  })
 .catch(err => {
   res.status(500).send('DATABASE ERROR: ' + err.message)
 })
})

router.put('/updateUser/:id', (req, res) => {
  const id = Number(req.params.id)
  let userDetails = req.body.user
  console.log(req.body.user)
    db.updateUser(id, userDetails)
      .then(data => {
  res.json({message: 'You have updated ' + data + ' users'})
      })
    .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
