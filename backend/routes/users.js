const express = require('express')
const router = express.Router()

//get user
router.get('/', (req,res)=>{
    res.json({mssg: "GET ALL THE USERS"})
})
// get single user
router.get('/:id', (req,res)=>{
    res.json({mssg: "GET SINGLE USER"})
})
// get single user
router.post('/', (req,res)=>{
    res.json({mssg: "POST NEW USER"})
})
// DELETE A USER
router.delete('/:id', (req,res)=>{
    res.json({mssg: "DELETE SINGLE USER"})
})
// update single user
router.patch('/:id', (req,res)=>{
    res.json({mssg: "UPDATE SINGLE USER"})
})




module.exports = router