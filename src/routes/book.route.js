const router = require('express').Router()
const awaitHandler = require('../middleware/awaitHandler.middleware')
const auth = require('../middleware/auth.middleware')
const BookController = require('../controllers/book.controller')

//get all 
router.get('/all', awaitHandler(BookController.getAll))

//get one 
router.get('/:id', awaitHandler(BookController.getById))

//create 
router.post('/create',auth(), awaitHandler(BookController.create))

//edit
router.patch('/edit/:id',auth(), awaitHandler(BookController.update))

//delete 
router.delete('/delete/:sid',auth() ,awaitHandler(BookController.delete))

module.exports = router