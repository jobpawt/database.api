const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const BuyController = require('../controllers/buy.controller')

//get all 
router.get('/all', awaitHandler(BuyController.getAll))

//get one 
router.get('/:id', awaitHandler(BuyController.getById))

//create 
router.post('/create',auth(), awaitHandler(BuyController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(BuyController.update))

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(BuyController.delete))

module.exports = router