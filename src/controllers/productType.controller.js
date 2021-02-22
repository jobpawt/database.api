const HttpException = require('../utils/HttpException.utils')
const ProductTypeModel = require('../models/productType.model')

class ProductTypeController{

    table = "product type"

    getAll = async(req, res, next) => {
        const list = await ProductTypeModel.find()
        if(list.length == 0)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await ProductTypeModel.findOne({type_id: req.params.id}) 
        if(!result)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await ProductTypeModel.update(req.body, req.body.id)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.staus(200).send(`${this.table} was edited`)
    }

    delete = async(req, res, next) => {
        const result = await ProductTypeModel.delete({type_id: req.params.id})
        if(!result)
            throw new HttpException(404, `${this.table} not found`)
        res.staus(200).send(`${this.table} was deleted`)
    }

    create = async(req, res, next) => {
        const result = await ProductTypeModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send(`${this.table} was added`)
    }

}

module.exports = new ProductTypeController