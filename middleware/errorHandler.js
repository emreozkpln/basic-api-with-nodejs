const { constants } = require("../constants")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "VALIDATION_ERROR", message: err.message })
            break;
        case constants.UNAUTHHORIZED:
            res.json({ title: "UNAUTHHORIZED", message: err.message })
            break;
        case constants.FORBIDEN:
            res.json({ title: "FORBIDEN", message: err.message })
            break;
        case constants.NOT_FOUND:
            res.json({ title: "NOT_FOUND", message: err.message })
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "SERVER_ERROR", message: err.message })
            break;

        default:
            console.log("Error yok");
            break;
    }
}

module.exports = errorHandler