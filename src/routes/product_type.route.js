const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const ProductTypeController = require('../controllers/productType.controller')

//get all 
router.get('/all', awaitHandler(ProductTypeController.getAll))

//get one 
router.get('/:id', awaitHandler(ProductTypeController.getById))

//create 
router.post('/create',auth(), awaitHandler(ProductTypeController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(ProductTypeController.update))

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(ProductTypeController.delete))

module.exports = router