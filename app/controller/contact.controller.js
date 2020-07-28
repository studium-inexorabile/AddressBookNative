const db = require('../config/db.config')
const Contacts = db.contacts

exports.create = (req, res) => {
    // creates a user with request details
    // if successful, created contact is returned
    Contacts.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        uuid: req.body.uuid,
        userId: req.user.id
    }).then(contact => {
        res.send(contact)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}


exports.findAll = (req, res) => {
    // returns all contacts that belong to user
    Contacts.findAll({
        where:{
            userId: req.user.id
        }
    })
    .then(contact => {
        res.send(contact)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}

exports.findOne = (req, res) => {
    // returns contact that belongs to user
    // and matches request ID
    Contacts.findOne({
        where:{
            id: req.params.contactId,
            userId: req.user.id
        }
    })
    .then(contact => {
        res.send(contact)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}

exports.update = (req, res) => {
    // Finds the contact that matches request ID and belongs
    // to user. Then updates that contact with request details
    Contacts.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        uuid: req.body.uuid
    },{ 
        where:{
            id: req.params.contactId,
            userId: req.user.id
        }
    })
    .then(contact => {
        res.send(req.body)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}

exports.delete = (req, res) => {
    // deletes contact that belongs to user
    // and matches request ID
    Contacts.destroy({ 
        where:{
            id: req.params.contactId,
            userId: req.user.id
        }
    })
    .then(contact => {
        res.status(200).send(`Contact has been removed`)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}
