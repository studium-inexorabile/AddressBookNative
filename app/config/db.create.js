const mysql = require('mysql2')

const con = mysql.createConnection({
    // creates connection to mysql
    // with credential info
    host:'localhost',
    user:'root',
    password:'sscssc',
    database:''
})

con.connect((error) => {
    // connects to mysql, creates database, ends connection
    if(error) throw error
    console.log("Connected to database")

    const sql = 'CREATE DATABASE contacts_db'

    con.query(sql, (err,res) => {
        if(err) throw err
        console.log(res)
    })

    con.end()
})