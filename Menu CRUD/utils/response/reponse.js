const responseSuccess = (res, data = null) => {
  res.status(200).json({ status: true, data });
};

const responseFail = (res, code = 400, message = "") => {
  res.status(code).json({ status: false, message });
};

const responseCreated = (res, data) => {
  res.status(201).json({ status: true, data });
};

module.exports = { responseSuccess, responseFail, responseCreated };
