const db = require('../config/db.config')
const Users = db.users
const jwt = require('jsonwebtoken')

exports.create = (req, res) => {
    // Creates a user with request details.
    // If successful, a jwt is created and the user
    // and token are returned.
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        if(!user){
            // checks for invalid username / email
            res.status(401).send({message: "Username / Email already in use"})
        }else{
            // Token created using 'sign' method of jwt.
            // 'testing' used a salt
            const token = jwt.sign({ user }, 'testing')
            res.send({user, token})
        }    
    }).catch(err => {
        res.status(401).send({message: "Username / Email already in use"})
    })
}

exports.findAll = (req, res) => {
    // Returns all users in database
    Users.findAll()
    .then(user => {
        res.send(user)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}

exports.findOne = (req, res) => {
    // Returns user that matches request ID
    Users.findOne({
        where:{
            id: req.params.userId
        }
    })
    .then(user => {
        res.send(user)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}

exports.update = (req, res) => {
    // Updates user details on user that matches
    // request ID
    Users.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },{ 
        where:{
            id: req.params.userId
        }
    })
    .then(user => {
        res.send(req.body)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}

exports.delete = (req, res) => {
    // Deletes user that matches request ID
    Users.destroy({ 
        where:{
            id: req.body.userId
        }
    })
    .then(user => {
        res.status(200).send(`user has been removed`)
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}

exports.login = (req, res) => {
    // Finds user that matches request username
    // If matched, token is created and user / token is returned
    let username = req.body.username
    let password = req.body.password
    Users.findOne({
        where:{
            username: username
        }
    })
    .then((user) => {
        if(!user || !user.validPassword(password)){
            // checks for invalid username
            res.status(401).send({message: "Invalid Username / Password combination."})
        }else{
            // Token created using 'sign' method of jwt.
            // 'testing' used a salt 
           const token = jwt.sign({ user }, 'testing')
           res.send({user, token})
        }
    }).catch(err => {
        res.status(500).send(`Error -> ${err}`)
    })
}