import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/custom.error';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .send({ errors: error.serializeErrors() });
  }
};

export default errorHandler;
