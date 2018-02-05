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

router.post('/', (req, res) => {
  const user = req.body
  db.addUser(user)
  .then(userIds => {
    res.json({ userIds: { id: userIds[0]}})
  })
  .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

router.put('/:id', (req, res) => {
  const id=Number(req.params.id)
  const user = req.body
  db.updateUser(id, user)
  .then (userIds => {
    res.json({text:'Success'})
  })
  .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})

module.exports = router

