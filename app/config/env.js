const env = {
    // this object will be exported to 'db.config.js'
    // to set up the database environment
    database: 'contacts_db',
    host:'localhost',
    user:'root',
    password:'sscssc',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = env