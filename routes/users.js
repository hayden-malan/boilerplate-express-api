const express = require('express')
var request = require('superagent')

const getProverbs = require('../APIs/api').getProverbs

const router = express.Router()

router.get('/', (req, res) => {
  console.log(getProverbs)
  res.send('Hi')
})

module.exports = router

//
// getProverbs.then(result => {
//     console.log(result)
//     res.send(result)
//   })
// })
