const { responseCreated, responseFail, responseSuccess } = require("../../utils/response/reponse");
const User = require("../model/user.model");

const createUser = async (req, res) => {
  try {
    const newUser = await User(req.body).save();
    responseCreated(res, newUser);
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const getUser = await User.find({ _id: req.params.id });
    responseSuccess(res, getUser);
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const getUser = await User.find();
    responseSuccess(res, getUser);
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    responseSuccess(res, deletedUser);
  } catch (error) {
    responseFail(res, 400, error.message);
  }
};

module.exports = { createUser, getUser, getAllUser, deleteUser };
