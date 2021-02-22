const HttpException = require('../utils/HttpException.utils')
const StoreModel = require('../models/shop.model')
const CreateID = require('../utils/CreateID')

class ShopController {
    getAll = async(req, res, next) => {
        const list = await StoreModel.find()
        if(list.length == 0)
            throw new HttpException(404, 'Not found any store')
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await StoreModel.findOne({sid: req.params.pid}) 
        if(!result)
            throw new HttpException(404, 'Not found store')
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await StoreModel.update(req.body, req.body.sid)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send('store was edited')
    }

    delete = async(req, res, next) => {
        const result = await StoreModel.delete({sid: req.params.sid})
        if(!result)
            throw new HttpException(404, 'store not found')
        res.status(200).send('store was deleted')
    }

    create = async(req, res, next) => {
        req.body.sid = (await CreateID.hash(req.body)).toString().replace('/', '')
        const result = await StoreModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send('store was added')
    }
}

module.exports = new ShopController
