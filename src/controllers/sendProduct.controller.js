const HttpException = require('../utils/HttpException.utils')
const SendProductModel = require('../models/sendProduct.model')
const CreateID = require('../utils/CreateID')

class SendProductController{

    table = "send_product"

    getAll = async(req, res, next) => {
        const list = await SendProductModel.find()
        if(list.length == 0)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await SendProductModel.findOne({send_id: req.params.id}) 
        if(!result)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await SendProductModel.update(req.body, req.body.id)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.staus(200).send(`${this.table} was edited`)
    }

    delete = async(req, res, next) => {
        const result = await SendProductModel.delete({send_id : req.params.id})
        if(!result)
            throw new HttpException(404, `${this.table} not found`)
        res.staus(200).send(`${this.table} was deleted`)
    }

    create = async(req, res, next) => {
        req.body.send_product_id = (await CreateID.hash(req.body)).toString().replace('/', '')
        const result = await SendProductModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send(`${this.table} was added`)
    }

}

module.exports = new SendProductController 