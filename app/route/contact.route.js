const express = require('express')
const router = new express.Router()
const contacts = require('../controller/contact.controller')
const auth = require('../middleware/auth')

// creates 'express' routes for contacts
// auth middleware used on all routes
router.post('/api/contacts/create', auth, contacts.create)
router.get('/api/contacts', auth, contacts.findAll)
router.get('/api/contacts/:contactId', auth, contacts.findOne)
router.put('/api/contacts/:contactId', auth, contacts.update)
router.delete('/api/contacts/:contactId', auth, contacts.delete)

module.exports = router