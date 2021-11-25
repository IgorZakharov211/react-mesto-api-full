const { serverError } = require('../constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    const { statusCode = 500, message } = err;

    res.status(statusCode).send({
      message: statusCode === 500
        ? serverError
        : message,
    });
  }
  next();
};

module.exports = errorHandler;
