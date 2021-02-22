const router = require('express').Router()
const PaymentController = require('../controllers/payment.controller')
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')

//get all 
router.get('/all', awaitHandler(PaymentController.getAll))

//get one 
router.get('/:id', awaitHandler(PaymentController.getById))

//create 
router.post('/create',auth(), awaitHandler(PaymentController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(PaymentController.update) )

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(PaymentController.delete))

module.exports = router