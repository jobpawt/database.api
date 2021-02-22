const HttpException = require('../utils/HttpException.utils')
const PreProductModel = require('../models/preProduct.model')
const CreateID = require('../utils/CreateID')

class PreProductController{
    table = "pre-product"

    getAll = async(req, res, next) => {
        const list = await PreProductModel.find()
        if(list.length == 0)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await PreProductModel.findOne({pre_id: req.params.id}) 
        if(!result)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await PreProductModel.update(req.body, req.params.id)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send(`${this.table} was edited`)
    }

    delete = async(req, res, next) => {
        const result = await PreProductModel.delete({pre_id: req.params.id})
        if(!result)
            throw new HttpException(404, `${this.table} not found`)
        res.status(200).send(`${this.table} was deleted`)
    }

    create = async(req, res, next) => {
        const id = await CreateID.hash(req.body)
        req.body.pre_id = id.toString().replace('/', '')
        const result = await PreProductModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send(`${this.table} was added`)
    }

}

module.exports = new PreProductController 
