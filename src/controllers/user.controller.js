const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const HttpException = require("../utils/HttpException.utils");
const bycrpt = require("bcryptjs");
const UserModel = require("../models/user.model");
const CreateID = require("../utils/CreateID");

dotenv.config();

class UserController {
  getAll = async (req, res, next) => {
    let list = await UserModel.find();
    if (list.length == 0) throw new HttpException(404, "User not found");
    list = list.map((user) => {
      const { password, ...etc } = user;
      return etc;
    });
    res.status(206).send(list);
  };

  getById = async (req, res, next) => {
    const user = await UserModel.findOne({ uid: req.params.id });
    if (!user) throw new HttpException(404, "User not found");
    const { password, ...etc } = user;
    res.status(206).send(etc);
  };

  update = async (req, res, next) => {
    req.body.password = await bycrpt.hash(req.body.password, 8);
    const result = await UserModel.update(req.body, req.body.uid);
    if (!result) throw new HttpException(404, "Somthing went wrong");

    res.staus(200).send("user was edited");
  };

  delete = async (req, res, next) => {
    const result = await UserModel.delete(req.params.id);
    if (!result) throw new HttpException(404, "User not found");
    res.status(200).send("user has been deleted");
  };

  signIn = async (req, res, next) => {
    const { email, password: pass } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new HttpException(401, "Unable to login");

    const isMatch = await bycrpt.compare(pass, user.password);

    if (!isMatch) throw new HttpException(401, "Incorrect password");

    const token = jwt.sign({ uid: user.uid }, process.env.SECRET_JWT);

    const { password, ...etc } = user;
    res.status(206).send({ ...etc, token });
  };

  signUp = async (req, res, next) => {
    req.body.password = await bycrpt.hash(req.body.password, 8);
    req.body.uid = (await CreateID.hash(req.body)).toString().replace("/", "");
    const result = await UserModel.create(req.body);
    if (!result) throw new HttpException(500, "Somthing went wrong");
    res.status(201).send("user was created");
  };
}

module.exports = new UserController();
