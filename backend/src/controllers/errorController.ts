import express, { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);

  return res.status(400).json({
    status: 'error',
    message: err.message,
  });
};

export default globalErrorHandler;
