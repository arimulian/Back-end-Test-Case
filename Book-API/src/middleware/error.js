import { ResponseError } from "../error/ResponseError.js";

const errorHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({ message: err.message, error: err }).end();
  } else {
    res
      .status(500)
      .json({
        message: err.message,
        error: err.stack || "Internal server error",
      })
      .end();
  }
};

export { errorHandler };
