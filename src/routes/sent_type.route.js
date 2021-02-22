const express = require('express')
const router = express.Router()
const awaitHandler =  require('../middleware/awaitHandler.middleware')
const SentTypeController = require('../controllers/sentType.controller')
const auth = require('../middleware/auth.middleware')

//get all 
router.get('/all', awaitHandler(SentTypeController.getAll))

//get one 
router.get('/:sid', awaitHandler(SentTypeController.getById))

//create 
router.post('/create',auth(), awaitHandler(SentTypeController.create))

//edit
router.patch('/edit/:sid',auth(), awaitHandler(SentTypeController.update) )

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(SentTypeController.delete))

module.exports = router