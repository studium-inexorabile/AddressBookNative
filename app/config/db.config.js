const env = require('./env')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(env.database, env.user, env.password, {
    // creates instance of Sequelize (ORM) 
    // sets configuration of database using 'env.js'
    host: env.host,
    dialect: env.dialect,
    pool:{
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
})

sequelize.authenticate().then(()=>{
    // runs 'authenticate' method to connect to, 
    // and authenticate, database
    console.log('Connected to database')
}).catch(err => {
    console.log('Unable to connect', err)
})

// Create db object to hold details of database and Sequelize methods
const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize
// Connect both tables (contacts and users) to db object
db.contacts = require('../model/contact.model')(sequelize, Sequelize)
db.users = require('../model/user.model')(sequelize, Sequelize)
// Sets database relationships between contacts and users
db.users.hasMany(db.contacts)
db.contacts.belongsTo(db.users)
module.exports = db