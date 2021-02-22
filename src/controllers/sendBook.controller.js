const HttpException = require("../utils/HttpException.utils");
const SendBookModel = require("../models/sendBook.model");
const CreateID = require("../utils/CreateID");

class SendBookController {
  table = "send_book";

  getAll = async (req, res, next) => {
    const list = await SendBookModel.find();
    if (list.length == 0)
      throw new HttpException(404, `Not found any ${this.table}`);
    res.status(206).send(list);
  };

  getById = async (req, res, next) => {
    const result = await SendBookModel.findOne({ send_id: req.params.id });
    if (!result) throw new HttpException(404, `Not found any ${this.table}`);
    res.status(206).send(result);
  };

  update = async (req, res, next) => {
    const result = await SendBookModel.update(req.body, req.body.id);
    if (!result) throw new HttpException(404, "Something went wrong");
    res.staus(200).send(`${this.table} was edited`);
  };

  delete = async (req, res, next) => {
    const result = await SendBookModel.delete({ send_id: req.params.id });
    if (!result) throw new HttpException(404, `${this.table} not found`);
    res.staus(200).send(`${this.table} was deleted`);
  };

  create = async (req, res, next) => {
    req.body.send_book_id = (await CreateID.hash(req.body))
      .toString()
      .replace("/", "");
    const result = await SendBookModel.create(req.body);
    if (!result) throw new HttpException(404, "Something went wrong");
    res.status(200).send(`${this.table} was added`);
  };
}

module.exports = new SendBookController();
