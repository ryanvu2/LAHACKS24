//entry file for the backend app
//where we register the express app
require('dotenv').config()
const express = require('express')
const userRoutes = require('./routes/users')

//express app
const app = express()

//middleware
app.use(express.json()) //any request that comes it looks and checks if it has some body to the request or data that it sends to the server and if it does it parses and attaches to the request object so i can access it in request handler
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
//route handeler to react to requests
//routes
app.use('/api/users',userRoutes)

//listen for requests
app.listen(process.env.PORT, ()=>{
    console.log("listening on port " + process.env.PORT)
})