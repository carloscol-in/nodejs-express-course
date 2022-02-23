const express = require('express')
// const faker = require('faker')

const router = express.Router()

router.use('/', (req, res) => {
  console.log(req, res)
})

module.exports = router
