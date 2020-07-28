const db = require('../config/db.config')
const Users = db.users
const Op = db.Sequelize.Op

const validate = async(req, res, next) => {
    // validates username / email combination
    // used as middleware on '/api/users/create' route
    try{
        const users = await Users.findAll({
            // finds users that match request email or username
            where: {
                [Op.or] : [
                    {username: req.body.username},
                    {email: req.body.email}
                ]
            }
        })
        if(users.length == 0){
            // if none are found, username / email combination is valid
            next()
        }else{
            // if users matching request email or username exist,
            // error is thrown specifying issue
            let errors = []
            for(let i in users){
                if(users[i].dataValues.username === req.body.username){
                    errors.push('Username already in use.')
                }
                if(users[i].dataValues.email === req.body.email){
                    errors.push('Email already in use')
                }
            }
            throw errors
        }
    }catch(e){
        res.status(401).send({error:e})
    }
}
module.exports = validate