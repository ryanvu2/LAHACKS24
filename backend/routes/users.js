const express = require('express')
const User = require('../models/userModel')
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
router.post('/', async(req,res)=>{
    const {firstName, lastName, currJournal, journalHistory, usersDoctors} = req.body

    try{
        const user = await User.create({firstName, lastName, currJournal, journalHistory, usersDoctors})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
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