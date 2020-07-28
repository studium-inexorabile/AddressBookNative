const bcrypt = require('bcryptjs')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        // defines 'user' table in database
        username : {
            type: Sequelize.STRING,
            unique: true
        },
        email : {
            type: Sequelize.STRING,
            unique: true
        },
        password : {
            type: Sequelize.STRING,
            allowNull : false
        }
    }, {
        hooks:{
            // uses bcrypt to hash password
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync(10)
                user.password = bcrypt.hashSync(user.password, salt)
            }
        }
    })
    User.prototype.validPassword = function(password){
        // creates method to test password validity
        return bcrypt.compareSync(password, this.password)
    }
    return User
}