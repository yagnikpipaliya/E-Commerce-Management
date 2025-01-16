
const responseSuccess = (res, data = null) => {
    res.status(200).json(data);
}

const responseFail = (res, code=400, message="") => {
    res.status(code).json({ message });
}

const responseCreated = (res, data) => {
    res.status(201).json(data);
}

module.exports = { responseSuccess, responseFail, responseCreated }
