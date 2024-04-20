//entry file for the backend app
//where we register the express app
require('dotenv').config()
const express = require('express')

//express app
const app = express()

//middleware
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
//route handeler to react to requests
//routes
app.get('/', (req,res)=>{
    res.json({mssg:"welcome to the app"})
})

//listen for requests
app.listen(process.env.PORT, ()=>{
    console.log("listening on port " + process.env.PORT)
})