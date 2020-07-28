const db = require('../config/db.config')
const Users = db.users
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    // authenticates the request before being sent to the database
    // used as middleware in 'contact' and 'user' routes
    try{
        if(req.header('Authorization')){
            // pulls token from header and verifies that token
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, 'testing')
            // queries database for user that matches 
            // the token's corresponding ID
            const user = await Users.findOne({
                where:{
                 id: decoded.user.id
                }
            })
            if(!user){
                // throws error if no user matches token
                throw new Error("User does not exist.")
            }
            // adds token and user details to request
            // that will be passed to routes
            req.token = token
            req.user = user.dataValues
            next()
        }else{
            // throws error for unauthenticated token
            throw new Error("Please authenticate.")
        }
    }catch (e) {
        res.status(401).send(`Error -> ${e}`)
    }
}

module.exports = auth