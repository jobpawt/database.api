const express = require('express')
const router = express.Router()
const awaitHandler =  require('../middleware/awaitHandler.middleware')
const PromotionController = require('../controllers/promotion.controller')
const auth = require('../middleware/auth.middleware')

//get all 
router.get('/all', awaitHandler(PromotionController.getAll))

//get one 
router.get('/:sid', awaitHandler(PromotionController.getById))

//create 
router.post('/create',auth(), awaitHandler(PromotionController.create))

//edit
router.patch('/edit/:sid',auth(), awaitHandler(PromotionController.update) )

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(PromotionController.delete))

module.exports = router