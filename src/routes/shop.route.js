const express = require('express')
const router = express.Router()
const awaitHandler =  require('../middleware/awaitHandler.middleware')
const ShopController = require('../controllers/shop.controller')
const auth = require('../middleware/auth.middleware')

//get all 
router.get('/all', awaitHandler(ShopController.getAll))

//get one 
router.get('/:sid', awaitHandler(ShopController.getById))

//create 
router.post('/create',auth(), awaitHandler(ShopController.create))

//edit
router.patch('/edit/:sid',auth(), awaitHandler(ShopController.update) )

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(ShopController.delete))

module.exports = router