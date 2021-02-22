const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const PreProductController = require('../controllers/preProduct.controller')

//get all 
router.get('/all', awaitHandler(PreProductController.getAll))

//get one 
router.get('/:id', awaitHandler(PreProductController.getById))

//create 
router.post('/create',auth(), awaitHandler(PreProductController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(PreProductController.update) )

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(PreProductController.delete))

module.exports = router