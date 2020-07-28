module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define('contact',{
        // defines 'contact' table in database
        name:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        uuid: {
            type: Sequelize.UUID
        }
    })
    return Contact
}