const HttpException = require("../utils/HttpException.utils");
const PaymentModel = require("../models/payment.model");
const CreateID = require("../utils/CreateID");

class PaymentController {
  table = "payment";

  getAll = async (req, res, next) => {
    const list = await PaymentModel.find();
    if (list.length == 0)
      throw new HttpException(404, `Not found any ${this.table}`);
    res.status(206).send(list);
  };

  getById = async (req, res, next) => {
    const result = await PaymentModel.findOne({ payment_id: req.params.id });
    if (!result) throw new HttpException(404, `Not found any ${this.table}`);
    res.status(206).send(result);
  };

  update = async (req, res, next) => {
    const result = await PaymentModel.update(req.body, req.body.id);
    if (!result) throw new HttpException(404, "Something went wrong");
    res.staus(200).send(`${this.table} was edited`);
  };

  delete = async (req, res, next) => {
    const result = await PaymentModel.delete({ payment_id: req.params.id });
    if (!result) throw new HttpException(404, `${this.table} not found`);
    res.staus(200).send(`${this.table} was deleted`);
  };

  create = async (req, res, next) => {
    req.body.payment_id = (await CreateID.hash(req.body))
      .toString()
      .replace("/", "");
    const result = await PaymentModel.create(req.body);
    if (!result) throw new HttpException(404, "Something went wrong");
    res.status(200).send(`${this.table} was added`);
  };
}

module.exports = new PaymentController();
