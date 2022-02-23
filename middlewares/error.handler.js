function logErrors(err, req, res, next) {
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: "Error",
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  else {
    next(err)
  }
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
}
