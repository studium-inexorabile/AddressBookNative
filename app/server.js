const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
// Parses incoming request bodies in a middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// uses additional HTTP headers to tell browsers to give 
// appl running at 'http://localhost:8080', access to 
// API at 'http://localhost:3000'
const cors = require('cors')
const corsOptions = {
  origin: 'http://127.0.0.1:19000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Syncs models to the database
const db = require('./config/db.config')
db.sequelize.sync({force:false}).then(()=> {
  console.log('table added')
})

// adds 'contact' and 'user' routes to API
const ContactRoute = require('./route/contact.route')
const UserRoute = require('./route/user.route')
app.use(ContactRoute)
app.use(UserRoute)

// listens for connections on the given port
var server = app.listen(port, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})