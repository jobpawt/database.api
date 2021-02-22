const HttpException = require("../utils/HttpException.utils");
const PromotionModel = require("../models/promotion.model");
const CreateID = require("../utils/CreateID");

class PromotionController {
  table = "promotions";

  getAll = async (req, res, next) => {
    const list = await PromotionModel.find();
    if (list.length == 0)
      throw new HttpException(404, `Not found any ${this.table}`);
    res.status(206).send(list);
  };

  getById = async (req, res, next) => {
    const result = await PromotionModel.findOne({ pro_id: req.params.id });
    if (!result) throw new HttpException(404, `Not found any ${this.table}`);
    res.status(206).send(result);
  };

  update = async (req, res, next) => {
    const result = await PromotionModel.update(req.body, req.body.pro_id);
    if (!result) throw new HttpException(404, "Something went wrong");
    res.status(200).send(`${this.table} was edited`);
  };

  delete = async (req, res, next) => {
    const result = await PromotionModel.delete({ pro_id: req.params.id });
    if (!result) throw new HttpException(404, `${this.table} not found`);
    res.status(200).send(`${this.table} was deleted`);
  };

  create = async (req, res, next) => {
    const id = (await CreateID.hash(req.body))
      .toString()
      .replace("/", "");
    req.body.pro_id = id;
    const result = await PromotionModel.create(req.body);
    if (!result) throw new HttpException(404, "Something went wrong");
    res.status(200).send(`${this.table} was added`);
  };
}

module.exports = new PromotionController();
