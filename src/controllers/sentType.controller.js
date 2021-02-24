const HttpException = require('../utils/HttpException.utils')
const SentTypeModel = require('../models/sentType.model')
const CreateID = require('../utils/CreateID')

class SentTypeController{

    table = "sent_type"

    getAll = async(req, res, next) => {
        const list = await SentTypeModel.find()
        if(list.length == 0)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(list) 
    }         

    getById = async(req, res, next) => {
        const result = await SentTypeModel.findOne({sent_type_id: req.params.id}) 
        if(!result)
            throw new HttpException(404, `Not found any ${this.table}`)
        res.status(206).send(result)
    }

    update = async(req, res, next) => {
        const result = await SentTypeModel.update(req.body, req.body.id)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.staus(200).send(`${this.table} was edited`)
    }

    delete = async(req, res, next) => {
        const result = await SentTypeModel.delete({sent_type_id: req.params.id})
        if(!result)
            throw new HttpException(404, `${this.table} not found`)
        res.staus(200).send(`${this.table} was deleted`)
    }

    create = async(req, res, next) => {
        const id = await CreateID.hash(req.body)
        req.body.send_type_id = id.toString().replace('/', '') 
        const result = await SentTypeModel.create(req.body)
        if(!result)
            throw new HttpException(404, 'Something went wrong')
        res.status(200).send({"id" : req.body.send_type_id})
    }

}

module.exports = new SentTypeController 
