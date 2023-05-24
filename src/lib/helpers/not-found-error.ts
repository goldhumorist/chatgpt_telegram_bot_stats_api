import { NextFunction, Request, Response } from 'express';

interface IErrorWithStatus extends Error {
  status: number;
}

function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new Error('Not Found') as IErrorWithStatus;
  err.status = 404;

  next(err);
}

function errorHandler(
  err: IErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errorStatus = err.status || 500;
  res.status(404).json({ status: errorStatus, error: err.message });
}

export { notFound, errorHandler };
