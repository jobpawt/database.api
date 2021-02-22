const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const SendProductController = require('../controllers/sendProduct.controller')

//get all 
router.get('/all', awaitHandler(SendProductController.getAll))

//get one 
router.get('/:id', awaitHandler(SendProductController.getById))

//create 
router.post('/create',auth(), awaitHandler(SendProductController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(SendProductController.update))

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(SendProductController.delete))

module.exports = router