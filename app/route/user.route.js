const express = require('express')
const router = new express.Router()
const users = require('../controller/user.controller')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')

// creates 'express' routes for contacts
// validate middleware used on 'create' route
// auth middleware used on routes concerning user info
router.post('/api/users/create', validate, users.create)
router.post('/api/users/login', users.login)
router.get('/api/users/', auth, users.findAll)
router.get('/api/users/', auth, users.findOne)
router.put('/api/users/', auth, users.update)
router.delete('/api/users/', auth, users.delete)

module.exports = router