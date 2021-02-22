const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const SendBookController = require('../controllers/sendBook.controller')

//get all 
router.get('/all', awaitHandler(SendBookController.getAll))

//get one 
router.get('/:id', awaitHandler(SendBookController.getById))

//create 
router.post('/create',auth(), awaitHandler(SendBookController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(SendBookController.update))

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(SendBookController.delete))

module.exports = router