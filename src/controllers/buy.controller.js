const HttpException = require('../utils/HttpException.utils')
const BuyModel = require('../models/buy.model')
const CreateID = require('../utils/CreateID')

class BuyController{

    table = "buy"

    getAll = async(req, res, next) => {
        const list = await BuyModel.find()
        if(list.length == 0)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await BuyModel.findOne({buy_id: req.params.id}) 
        if(!result)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await BuyModel.update(req.body, req.params.id)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send(`${this.table} was edited`)
    }

    delete = async(req, res, next) => {
        const result = await BuyModel.delete({buy_id : req.params.id})
        if(!result)
            throw new HttpException(404, `${this.table} not found`)
        res.status(200).send(`${this.table} was deleted`)
    }

    create = async(req, res, next) => {
        req.body.buy_id = (await CreateID.hash(req.body)).toString().replace('/', '')
        console.log('debug uid => '+ req.body.uid);
        const result = await BuyModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send(`${this.table} was added`)
    }

}

module.exports = new BuyController
