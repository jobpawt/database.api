const HttpException = require('../utils/HttpException.utils')
const ProductModel = require('../models/product.model')
const CreateID = require('../utils/CreateID')

class ProductController {
    getAll = async(req, res, next) => {
        const list = await ProductModel.find()
        if(list.length == 0)
            throw new HttpException(404, 'Not found any product')
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await ProductModel.findOne({pid: req.params.id}) 
        if(!result)
            throw new HttpException(404, 'Not found product')
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await ProductModel.update(req.body, req.params.id)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send('product was edited')
    }

    delete = async(req, res, next) => {
        const result = await ProductModel.delete({pid: req.params.id})
        if(!result)
            throw new HttpException(404, 'product not found')
        res.status(200).send('product was deleted')
    }

    create = async(req, res, next) => {
        req.body.pid = (await CreateID.hash(req.body)).toString().replace('/','');
        const result = await ProductModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send('product was added')
    }
}

module.exports = new ProductController