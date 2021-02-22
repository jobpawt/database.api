const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const awaitHandler = require('../middleware/awaitHandler.middleware')
const Role = require('../utils/Role')

//get all user
router.get('/all',auth(Role.admin) ,awaitHandler(userController.getAll))
//get one user
router.get('/:id',auth(Role.admin, Role.user) ,awaitHandler(userController.getById))
//create user
router.post('/create', awaitHandler(userController.signUp))
//login user
router.post('/login', awaitHandler(userController.signIn))
//delete
router.delete('/delete/:id',auth(Role.admin), awaitHandler(userController.delete))
//edit
router.patch('/edit/:id',auth(Role.admin, Role.user), awaitHandler(userController.update))

module.exports = router