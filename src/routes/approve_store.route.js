const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const ApproveStoreController = require('../controllers/approveStore.controller')

//get all 
router.get('/all', awaitHandler(ApproveStoreController.getAll))

//get one 
router.get('/:id', awaitHandler(ApproveStoreController.getById))

//create 
router.post('/create',auth(), awaitHandler(ApproveStoreController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(ApproveStoreController.update))

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(ApproveStoreController.delete))

module.exports = router