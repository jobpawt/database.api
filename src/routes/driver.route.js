const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const DriverController = require('../controllers/driver.controller')

//get all 
router.get('/all', awaitHandler(DriverController.getAll))

//get one 
router.get('/:id', awaitHandler(DriverController.getById))

//create 
router.post('/create',auth(), awaitHandler(DriverController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(DriverController.update) )

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(DriverController.delete))

module.exports = router