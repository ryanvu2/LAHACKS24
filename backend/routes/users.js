const express = require('express')
const router = express.Router()
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../routes/controllers/userController')

//get user
router.get('/', getUsers)
// get single user
router.get('/:id', getUser)
// get single user
router.post('/', createUser)
// DELETE A USER
router.delete('/:id', deleteUser)
// update single user
router.patch('/:id', updateUser)




module.exports = router