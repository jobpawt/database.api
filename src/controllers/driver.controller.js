const HttpException = require('../utils/HttpException.utils')
const DriverModel = require('../models/driver.model')
const CreateID = require('../utils/CreateID')

class DriverController{

    getAll = async(req, res, next) => {
        const list = await DriverModel.find()
        if(list.length == 0)
            throw new HttpException(404, 'Not found any drivers')
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await DriverModel.findOne({driver_id: req.params.id}) 
        if(!result)
            throw new HttpException(404, 'Not found driver')
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await DriverModel.update(req.body, req.body.id)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.staus(200).send('driver was edited')
    }

    delete = async(req, res, next) => {
        const result = await DriverModel.delete({driver_id: req.params.id})
        if(!result)
            throw new HttpException(404, 'store not found')
        res.staus(200).send('driver was deleted')
    }

    create = async(req, res, next) => {
        req.body.did = (await CreateID.hash(req.body)).toString().replace('/', '')
        const result = await DriverModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send('driver was added')
    }

}

module.exports = new DriverController 